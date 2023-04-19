//SPDX-License-Identifier:MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DappCinemas is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _totalMovies;
    Counters.Counter private _totalTickets;

    struct MovieStruct {
        uint256 id;
        string name;
        string imageUrl;
        string genre;
        string description;
        uint256 timestamp;
        bool deleted;
    }

    struct TicketStruct {
        uint256 id;
        uint256 movieId;
        uint256 slotId;
        address owner;
        uint256 cost;
        uint256 timestamp;
        uint256 day;
        bool refunded;
    }

    struct TimeSlotStruct {
        uint256 id;
        uint256 movieId;
        uint256 ticketCost;
        uint256 startTime;
        uint256 endTime;
        uint256 capacity;
        uint256 seatings;
        bool deleted;
        bool published;
        uint256 day;
    }

    event Action(string actionType);

    mapping(uint256 => MovieStruct) movies;
    mapping(uint256 => bool) movieExists;
    mapping(uint256 => bool) timeslotExists;
    mapping(uint256 => bool) movieToTicketHolders;
    mapping(uint256 => TimeSlotStruct[]) slotsOf;
    mapping(uint256 => TimeSlotStruct[]) movieSlotsOf;
    mapping(uint256 => mapping(uint256 => TicketStruct[])) ticketsOf;


    function addMovie(
        string memory name,
        string memory imageUrl,
        string memory genre,
        string memory description
    ) public onlyOwner {
        require(bytes(name).length > 0, "Movie name required");
        require(bytes(imageUrl).length > 0, "Movie image url required");
        require(bytes(genre).length > 0, "Movie genre required");
        require(bytes(description).length > 0, "Movie description required");

        _totalMovies.increment();
        MovieStruct memory movie;

        movie.id = _totalMovies.current();
        movie.name = name;
        movie.imageUrl = imageUrl;
        movie.genre = genre;
        movie.description = description;
        movie.timestamp = currentTime();

        movies[_totalMovies.current()] = movie;
        movieExists[_totalMovies.current()] = true;

        emit Action("Movie added successfully");
    }

    function updateMovie(
        uint256 id,
        string memory name,
        string memory imageUrl,
        string memory genre,
        string memory description
    ) public onlyOwner {
        require(movieExists[id] == true, "movie doesn't exist!");
        require(!movieToTicketHolders[id],"movie already has ticket holders");
        require(bytes(name).length > 0, "Movie name required");
        require(bytes(imageUrl).length > 0, "Movie image url required");
        require(bytes(genre).length > 0, "Movie genre required");
        require(bytes(description).length > 0, "Movie description required");

        movies[id].name = name;
        movies[id].imageUrl = imageUrl;
        movies[id].genre = genre;
        movies[id].description = description;
        emit Action("Movie updated successfully");
    }

    function deleteMovie(uint256 id) public onlyOwner {
        require(movieExists[id] == true, "movie doesn't exist!");
        require(!movieToTicketHolders[id],"movie already has ticket holders");

        movies[id].deleted = true;
        movieExists[id] = false;
    }

    function getMovies() public view returns (MovieStruct[] memory Movies) {
        uint256 totalMovies;
        for (uint256 i = 1; i <= _totalMovies.current(); i++) {
            if (!movies[i].deleted) totalMovies++;
        }

        Movies = new MovieStruct[](totalMovies);

        uint256 j = 0;
        for (uint256 i = 1; i <= _totalMovies.current(); i++) {
            if (!movies[i].deleted) {
                Movies[j] = movies[i];
                j++;
            }
        }
    }

    function getMovie(uint256 id) public view returns (MovieStruct memory) {
        return movies[id];
    }

    function addSlot(
        uint256 movieId,
        uint256 ticketCost,
        uint256 startTime,
        uint256 endTime,
        uint256 capacity,
        uint256 day
    ) public onlyOwner {
        require(capacity > 0, "Capacity must be greater than 0!");
        require(ticketCost > 0 ether, "Ticket price must be greater than 0!");

        
        TimeSlotStruct memory timeslot;

        timeslot.id = slotsOf[day].length;
        timeslot.movieId = movieId;
        timeslot.ticketCost = ticketCost;
        timeslot.startTime = startTime;
        timeslot.endTime = endTime;
        timeslot.day = day;
        timeslot.capacity = capacity;

        timeslotExists[movieSlotsOf[movieId].length] = true;
        movieSlotsOf[movieId].push(timeslot);
        slotsOf[day].push(movieSlotsOf[movieId][timeslot.id]);
    }

    function deleteSlot(
        uint256 id,
        uint256 movieId
    ) public onlyOwner {
        require(timeslotExists[id],"timeslot doesn't exist");
        performRefund(movieId, movieSlotsOf[movieId][id].day);

        movieSlotsOf[movieId][id].deleted = true;
        slotsOf[movieSlotsOf[movieId][id].day][id].deleted = true;
    }


    function getSlots(uint256 day)
     public
     view
     returns (TimeSlotStruct[] memory Timelines)
    {
        uint256 totalSpace;
        for (uint256 i = 0; i < slotsOf[day].length; i++) {
            totalSpace++;
        }

        Timelines = new TimeSlotStruct[](totalSpace);

        uint256 index;
        for (uint256 i = 0; i < slotsOf[day].length; i++) {
            TimeSlotStruct memory theSlot = slotsOf[day][i];
            Timelines[index] = theSlot;
            index++;
        }
    }

    function getSlotsForMovie(uint movieId) 
        public 
        view
        returns(TimeSlotStruct[] memory Timelines) 
    {
        uint256 totalSpace;
        for(uint256 i = 0; i < movieSlotsOf[movieId].length; i++) {
            totalSpace++;
        }
        Timelines = new TimeSlotStruct[](totalSpace);

        uint index;
        for(uint256 i = 0; i < movieSlotsOf[movieId].length; i++) {
            TimeSlotStruct memory theSlot = movieSlotsOf[movieId][i];
            Timelines[index] = theSlot;
            index++;
        }
    }

    function getSlot(uint movieId, uint id) public view returns(TimeSlotStruct memory) {
        return movieSlotsOf[movieId][id];
    }

    function getSlotForDay(uint id, uint day) public view returns(TimeSlotStruct memory) {
        return slotsOf[day][id];
    }

    function publishTimeSlot(uint256 id, uint256 movieId, uint256 day) public onlyOwner {
        require(timeslotExists[id], "timeslot doesn't exist");
        require(!movieSlotsOf[movieId][id].published, "timeslot already published");

        movieSlotsOf[movieId][id].published = true;
        slotsOf[day][id].published = true;
    }

    function buyTicket(uint256 movieId,uint256 day, uint256 id) public payable {
        require(msg.value >= movieSlotsOf[movieId][id].ticketCost, "Insufficient amount");
        require(movieSlotsOf[movieId][id].published, "Time slot doesn't exist");
        require(movieSlotsOf[movieId][id].seatings < movieSlotsOf[movieId][id].capacity, "Capacity full, book the next slot");

        _totalTickets.increment();
        TicketStruct memory ticket;
        ticket.id = _totalTickets.current();
        ticket.movieId = movieId;
        ticket.day = day;
        ticket.slotId = id;
        ticket.cost = msg.value;
        ticket.owner = msg.sender;
        ticket.timestamp = currentTime();

        slotsOf[day][id].seatings++;
        movieSlotsOf[movieId][id].seatings++;
        ticketsOf[movieId][id].push(ticket);
        movieToTicketHolders[movieId] = true;
    }

    function getTicketHolders(uint movieId, uint day) public view returns(TicketStruct[] memory) {
        return ticketsOf[movieId][day];
    }

    function withdraw(uint256 movieId, uint256 id) public onlyOwner {
        require(movieSlotsOf[movieId][id].published, "Time slot doesn't exist");
        require(currentTime() > movieSlotsOf[movieId][id].endTime, "Movie has not ended yet");
        
        uint256 amount = movieSlotsOf[movieId][id].ticketCost * movieSlotsOf[movieId][id].seatings;
        require(amount > 0, "No money to withdraw");

        movieSlotsOf[movieId][id].seatings = 0;
        payTo(owner(),amount);
    }


    function performRefund(uint256 movieId, uint256 day) internal {
        for (uint256 i = 0; i < ticketsOf[movieId][day].length; i++) {
            TicketStruct storage ticket = ticketsOf[movieId][day][i];
            if (ticket.movieId == movieId && !ticket.refunded) {
                ticket.refunded = true;
                _totalTickets.decrement();
                payTo(ticket.owner, ticket.cost);
            }
        }
    }


    function checkForTicketHolders(uint movieId) public view returns(bool) {
          return movieToTicketHolders[movieId];
    }


    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function currentTime() internal view returns (uint256) {
        uint256 newNum = (block.timestamp * 1000) + 1000;
        return newNum;
    }

    function returnOwner () public view returns (address) {
        return owner();
    }
  
}