import { useState, useEffect } from "react";
import MovieIcon from "@mui/icons-material/Movie";
import ManagementIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon  from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import { connectWallet } from "../services/Blockchain.services";
import { truncate, useGlobalState } from "../store";
import {
  getOwner,
  getMovies
} from "../services/Blockchain.services";

const Sidebar = ()=> {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [loaded,setLoaded] = useState(false)
  const [deployer] = useGlobalState("deployer")
  

  useEffect(async () => {
    await getOwner().then(()=>setLoaded(true))
  }, []);

  return (
    <div className="hidden sm:flex">
      <div className=" w-64 h-screen bg-transparent border-r-2 border-grey-200">
        <div className="flex flex-col py-4 px-8 ">
          <Link to="/">
            dapp.<span className="text-red-500">Cinemas</span>
          </Link>
          <div className="mt-8">
            <h6 className="text-xs mb-4">Dashboard</h6>
            {loaded ? (
              <div className="flex flex-col space-y-2 ">
                <div className=" border-l-2 transparent hover:border-l-2 hover:border-red-400">
                  <Link
                    to="/"
                    className=" ml-8 cursor-pointer text-gray-600 hover:text-red-700 "
                  >
                    <MovieIcon />
                    <span className="ml-4 text-sm text-gray-700">Movies</span>
                  </Link>
                </div>
                {connectedAccount &&
                connectedAccount == deployer?.toLowerCase() ? (
                  <>
                    <div className="border-l-2 transparent hover:border-l-2 hover:border-red-400">
                      <Link
                        to="/managemovies"
                        className=" ml-8 cursor-pointer text-gray-600 hover:text-red-700"
                      >
                        <ManagementIcon />
                        <span className="ml-4 text-sm text-gray-700">
                          Manage movies
                        </span>
                      </Link>
                    </div>

                    <div className="border-l-2 transparent hover:border-l-2 hover:border-red-400">
                      <Link
                        to="/addmovies"
                        className=" ml-8 cursor-pointer text-gray-600 hover:text-red-700"
                      >
                        <AddIcon />
                        <span className="ml-4 text-sm text-gray-700">
                          Add Movies
                        </span>
                      </Link>
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-6 border-t-2 border-grey">
            <div className="flex mt-4 list-none">
              {connectedAccount ? (
                <button
                  type="button"
                  className="inline-block px-8 py-2 border-2 border-red-600  text-xs leading-tight uppercase rounded-full focus:outline-none focus:ring-0 bg-gradient-to-r from-cyan-500 to-red-500 text-white font-bold"
                >
                  {truncate(connectedAccount, 4, 4, 11)}
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-block px-6 py-2 border-2 border-red-600  font-medium text-xs leading-tight uppercase rounded-full hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-gradient-to-r from-cyan-500 to-red-500 hover:text-white hover:border-white"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
