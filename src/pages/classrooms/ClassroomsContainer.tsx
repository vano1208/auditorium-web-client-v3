import React, { useEffect, useState } from "react";
import Classrooms from "./Classrooms";
import { GET_CLASSROOMS } from "../../api/operations/queries/classrooms";
import { client } from "../../api/client";
import { ClassroomType } from "../../models/models";
import { ISODateString } from "../../helpers/helpers";
import { gql, useQuery } from "@apollo/client";

type PropTypes = {};

const ClassroomsContainer: React.FC<PropTypes> = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data } = useQuery(gql`
    query gridUpdate {
      gridUpdate @client
    }
  `);

  useEffect(() => {
    client
      .query({
        query: GET_CLASSROOMS,
        variables: { date: ISODateString(new Date()) },
      })
      .then((data) => {
        setLoading(data.loading);
        setClassrooms(
          data.data.classrooms
            .slice()
            .sort(
              (a: ClassroomType, b: ClassroomType) =>
                parseInt(a.name) - parseInt(b.name)
            )
        );
      });
  }, [data.gridUpdate]);
  if (!loading)
    return (
      <div>
        <Classrooms classrooms={classrooms} />
      </div>
    );
  return <p>Loading</p>;
};

export default ClassroomsContainer;
