import jwt_decode from "jwt-decode";
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import React from "react";
import { Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { useQuery } from "react-query";
import { GetAllSeller } from "../api";
import Layout from "../components/Layout";

const CustomLoader = dynamic(() =>
  import("../components/Layout/CustomLoader").then((p) => p.default)
);

const Wrapper = ({ children }) => (
  <Text style={{ color: "rgb(39, 39, 39)" }}>{children}</Text>
);

function AllUsers() {
  const { isLoading, error, data } = useQuery("allSellers", GetAllSeller, {
    retry: false,
  });

  if (isLoading) return <CustomLoader />;

  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An Error Occurred</Text>
      </View>
    );

  return (
    <Layout title="Users List">
      <View style={{ color: "rgba(39, 39, 39)" }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Wrapper>Name</Wrapper>
            </DataTable.Title>
            <DataTable.Title>
              <Wrapper>Email</Wrapper>
            </DataTable.Title>
            <DataTable.Title>
              <Wrapper>Role</Wrapper>
            </DataTable.Title>
          </DataTable.Header>

          {data &&
            data.map((u, i) => (
              <DataTable.Row key={i}>
                <DataTable.Cell>
                  <Wrapper>{u.name}</Wrapper>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Wrapper>{u.email}</Wrapper>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Wrapper>{u.role}</Wrapper>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </View>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      notFound: true,
    };
  }
  const decode = jwt_decode(token);

  if (decode.role !== "admin") {
    return {
      notFound: true,
    };
  }
  return {
    props: { token, decode },
  };
}

export default AllUsers;
