import { useEffect } from 'react';
import Papa from 'papaparse';

import styled from 'styled-components';

import Chart from '../components/chart';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

const Header = styled.h2`
 text-align: center;
`

export default function App() {
  return (
    <Wrapper>
      <Header>
        Am vs Pm Monthly Running Distance Totals
      </Header>
      <Chart />
    </Wrapper>
  )
}
