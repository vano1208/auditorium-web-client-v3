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
import UserPopup from "../../components/user/UserPopup";
import PageHeader from "../../components/pageHeader/PageHeader";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";

interface Params {
  userId: string;

}

interface PT {
  meType: string;
}

const Users: React.FC<PT> = ({meType}) => {
  const {loading, error, data} = useQuery(GET_USERS);
  const {userId} = useParams<Params>();
  const [visibility, setVisibility] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [userSearch, setUserSearch] = useState("");
  const [sortBy, setSortBy] = useState("AZ");
  const [userTypes, setUserTypes] = useState("ALL");
  if (loading) return <Loading/>;
  if (error) return <Error/>;
  const userData = data.users.find((user: User) => user.id === Number(userId));
  const pages = Math.ceil(data.users.length / pageSize);
  let pagesList: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesList.push(i)
  }
  return (
    <>
      {userId && <UserPopup onClose={() => setVisibility("none")} visibility={visibility} userData={userData}/>}
      <PageHeader body="Користувачі">
        <select className={styles.usersSort} name="usersSort"
                id="usersSort"
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}>
          <option value="AZ">А - Я</option>
          <option value="ZA">Я - А</option>
          <option value="ID_UP">ID &#8593;</option>
          <option value="ID_DOWN">ID &#8595;</option>
        </select>
      </PageHeader>
      <ul>
        <li className={[styles.usersUnitList, styles.listHeader].join(" ")}>
          <div>ID</div>
          <div>П.І.Б. {<input
            className={styles.userSearch}
            type="text"
            placeholder="Пошук (П.І.Б. або ID)"
            value={userSearch}
            onChange={(e) => {
              setUserSearch(e.target.value);
              setCurrentPage(1);
            }}
          />}</div>
          <div><select className={styles.userTypes}
                       name="userTypes"
                       id="userTypes"
                       value={userTypes}
                       onChange={(e)=> {
                         setUserTypes(e.target.value);
                         setCurrentPage(1);
                       }}>
            <option value="ALL">Всі</option>
            {meType==="ADMINISTRATION"?<option value="STUDENT">Студенти</option>:null}
            <option value="TEACHER">Викладачі</option>
            {meType==="ADMINISTRATION"?<option value="POST_GRADUATE">Асистенти/Аспіранти</option>:null}
            <option value="ILLUSTRATOR">Іллюстратори</option>
            <option value="CONCERTMASTER">Концертмейстери</option>
          </select></div>
        </li>
        {data.users.slice().filter((user: User)=>{
          if(meType==="ADMINISTRATION") return true
          else {
            if(user.type==="POST_GRADUATE" || user.type==="STUDENT") return false
            else return true
          }
        }).filter((user: User)=> {
          if(userTypes==="ALL") return true
          return user.type === userTypes
        }).sort((a: any, b: any) => {
          let aFullname = [a.lastName, a.firstName, a.patronymic].join();
          let bFullname = [b.lastName, b.firstName, b.patronymic].join();
          return sortBy === "AZ" ?
            aFullname.localeCompare(bFullname) : sortBy === "ZA" ?
              bFullname.localeCompare(aFullname) : sortBy === "ID_UP" ?
                a.id-b.id: b.id-a.id;
        }).filter((user: any) => {
          return [user.lastName, user.firstName, user.patronymic, user.id].join(" ").indexOf(userSearch) !== -1
        }).slice(currentPage === 1 ?
          0 :
          (currentPage * pageSize) - pageSize, ((currentPage * pageSize) + pageSize) - pageSize)
          .map((user: any) => (
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
            <li style={currentPage===1?{color: "#ccc", border: "1px solid #ccc"}:{}} onClick={() => {
              currentPage >= 2 ? setCurrentPage((prevState => prevState - 1)) : setCurrentPage(1);
            }}>&lt;</li>
            {(currentPage >= 4) && <>
              <li onClick={() => setCurrentPage(1)}>1</li>
              <span className={styles.paginatorDots}>...</span></>}
            {pagesList
              .filter((pageNumber: number) => pageNumber < currentPage + 3 && pageNumber > currentPage - 3)
              .map((pageNumber: number) => <li key={pageNumber}
                                               onClick={() => setCurrentPage(pageNumber)}
                                               style={pageNumber === currentPage ? {
                                                 backgroundColor: "#1e2c4f",
                                                 color: "#fff"
                                               } : undefined}>{pageNumber}</li>)}
            {(currentPage < pages - 2) && <><span className={styles.paginatorDots}>...</span><li onClick={() => setCurrentPage(pages)}>{pages}</li></>}
            <li style={currentPage===pages?{color: "#ccc", border: "1px solid #ccc"}:{}}onClick={() => {
              currentPage <= pages - 1 ? setCurrentPage((prevState => prevState + 1)) : setCurrentPage(pages);
            }}>&gt;</li>
          </ul>
          <select className={styles.selectPageSize} name="pageSize" id="pageSize"
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}>
            <option value="10">10 / ст.</option>
            <option value="20">20 / ст.</option>
            <option value="50">50 / ст.</option>
            <option value="100">100 / ст.</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Users;
