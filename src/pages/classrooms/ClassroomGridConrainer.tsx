import React, { useEffect, useState } from "react";
import { Classroom } from "../../models/models";
import { GET_CLASSROOMS } from "../../api/operations/queries/classrooms";
import ClassroomsGrid from "./ClassroomsGrid";
import ClassroomsGridSkeleton from "./ClassroomsGridSkeleton";
import { client } from "../../api/client";
import { gql, useQuery } from "@apollo/client";
import Error from "../../components/error/Error";

interface PT {
  meType: string;
}

const ClassroomsGridContainer: React.FC<PT> = React.memo(({ meType }) => {
  const [classrooms, setClassrooms] = useState<Array<Classroom>>();
  const [filter, setFilter] = useState("ALL");
  const [withWing, setWithWing] = useState(true);
  const [onlyOperaStudio, setOnlyOperaStudio] = useState(false);
  const [readyForRewriting, setReadyForRewriting] = useState(false);
  let [visibility, setVisibility] = useState("none");
  const { data: gridUpdate, error } = useQuery(gql`
    query gridUpdate {
      gridUpdate @client
    }
  `);

  useEffect(() => {
    getClassrooms();
  }, [gridUpdate]);

  const getClassrooms = async () => {
    const {
      data: { classrooms },
    } = await client.query({
      query: GET_CLASSROOMS,
      variables: {
        date: new Date().toString(),
      },
      fetchPolicy: "cache-first",
    });
    setClassrooms(
      classrooms
        .slice()
        .sort((a: Classroom, b: Classroom) => {
          return parseInt(a.name) - parseInt(b.name)
        })
    );
  };

  let classroomsFilter =
    filter === "FREE"
      ? (classroom: Classroom) => classroom.occupied === null
      : filter === "SPECIAL"
      ? (classroom: Classroom) => classroom.special !== null
      : filter === "CHAIR"
      ? (classroom: Classroom) => classroom.chair !== null
      : () => true;

  const onClose = (value: string) => {
    setReadyForRewriting(false);
    setVisibility(value);
  };

  const onFilterChange = (value: string) => {
    setFilter(() => value);
  };

  if (classrooms === undefined && !error) return <ClassroomsGridSkeleton />;
  else if (classrooms === undefined && error) return <Error />;
  else
    return (
      <ClassroomsGrid
        classrooms={classrooms as Array<Classroom>}
        onFilterChange={onFilterChange}
        withWing={withWing}
        setWithWing={setWithWing}
        onlyOperaStudio={onlyOperaStudio}
        setOnlyOperaStudio={setOnlyOperaStudio}
        classroomsFilter={classroomsFilter}
        readyForRewriting={readyForRewriting}
        setReadyForRewriting={setReadyForRewriting}
        onClose={onClose}
        visibility={visibility}
        meType={meType}
      />
    );
});

export default ClassroomsGridContainer;
