import styled from 'styled-components';

import Chart from '../components/chart';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vw;
`;

const Header = styled.h2`
  margin-bottom: 50px;
`

export default function App() {
  return (
    <Wrapper>
      <Header>
        Super sick Strava data viz app
      </Header>
      <Chart />
    </Wrapper>
  )
}
