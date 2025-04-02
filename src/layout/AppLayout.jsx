import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Header from "../ui/Header";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 290px) 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 4rem;
  max-width: 120rem;
`;
const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
