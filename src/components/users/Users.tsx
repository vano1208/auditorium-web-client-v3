import React, {useState} from "react";
import {
  User,
  userTypes,
  userTypesUa,
} from "../../models/models";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "../../api/operations/queries/users";
import styles from './users.module.css';
import {NavLink, useParams} from "react-router-dom";
import UserPopup from "../user/UserPopup";

interface Params {
  userId: string
}

const Users: React.FC = () => {
  const {loading, error, data} = useQuery(GET_USERS);
  const {userId} = useParams<Params>();
  const [visibility, setVisibility] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [userSearch, setUserSearch] = useState("");
  const [sortBy, setSortBy] = useState("AZ");
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  const userData = data.users.find((user: User) => user.id === userId);
  const pages = Math.ceil(data.users.length / pageSize);
  let pagesList: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesList.push(i)
  }
  return (
    <div className={styles.users}>
      {userId && <UserPopup onClose={() => setVisibility("none")} visibility={visibility} userData={userData}/>}
      <div className={styles.usersHeader}>Користувачі</div>
      <ul>
        <li className={[styles.usersUnitList, styles.listHeader].join(" ")}>
          <div>ID</div>
          <div><span onClick={()=> {
            setSortBy(prevState => prevState.split("").reverse().join(""))
          }}>П.І.Б. </span>{<input
            className={styles.userSearch}
            type="text"
            placeholder="Пошук"
            value={userSearch}
            onChange={(e)=>setUserSearch(e.target.value)}
          />}</div>
          <div>Статус</div>
        </li>
        {data.users.slice().sort((a:User, b:User)=> {
          let aFullname = [a.lastName, a.firstName, a.patronymic].join();
          let bFullname = [b.lastName, b.firstName, b.patronymic].join();
          return sortBy==="AZ"?aFullname.localeCompare(bFullname):bFullname.localeCompare(aFullname)
        }).filter((user:User)=>{
         return [user.lastName, user.firstName, user.patronymic, user.id].join(" ").indexOf(userSearch)!==-1
        }).slice(currentPage === 1 ?
          0 :
          (currentPage * pageSize) - pageSize, ((currentPage * pageSize) + pageSize) - pageSize)
          .map((user: User) => (
          <li key={user.id} className={styles.usersUnitList}>
            <div>
              {user.id}
            </div>
            <div className={styles.userLink}>
              <NavLink onClick={() => setVisibility("block")}
                       to={"/users/" + user.id}>{[user.lastName, user.firstName, user.patronymic].join(" ")}</NavLink>
            </div>
            <div>{userTypesUa[user.type as userTypes]}</div>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <div>
      <ul className={styles.paginator}>
        <li onClick={() => {
          currentPage >= 2 ? setCurrentPage((prevState => prevState - 1)) : setCurrentPage(1);
        }}>&lt;</li>
        {(currentPage >= 4) && <>
          <li onClick={() => setCurrentPage(1)}>1</li>
          ... </>}
        {pagesList
          .filter((pageNumber: number) => pageNumber < currentPage + 3 && pageNumber > currentPage - 3)
          .map((pageNumber: number) => <li key={pageNumber}
                                           onClick={() => setCurrentPage(pageNumber)}
                                           style={pageNumber === currentPage ? {
                                             backgroundColor: "#1e2c4f",
                                             color: "#fff"
                                           } : undefined}>{pageNumber}</li>)}
        {(currentPage < pages - 2) && <> ... <li onClick={() => setCurrentPage(pages)}>{pages}</li></>}
        <li onClick={() => {
          currentPage <= pages - 1 ? setCurrentPage((prevState => prevState + 1)) : setCurrentPage(pages);
        }}>&gt;</li>
      </ul>
      <select className={styles.selectPageSize} name="pageSize" id="pageSize" onChange={(e)=>setPageSize(Number(e.target.value))}>
        <option value="10">10 / ст.</option>
        <option value="20">20 / ст.</option>
        <option value="50">50 / ст.</option>
        <option value="100">100 / ст.</option>
      </select>
        </div>
      </div>
    </div>
  );
};

export default Users;
