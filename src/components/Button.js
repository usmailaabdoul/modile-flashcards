import React from 'react'
import styled from 'styled-components/native';

const StyledButton = styled.TouchableOpacity`
  height: 40px;
  width: 200px;
  border-radius: 5px;
  background: ${props => props.outlined ? 'transparent' : '#948bfe'};
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const Text = styled.Text`
  font-size: 18px
  color: ${props => props.outlined ? (props.outlined && props.danger ? '#f73100' : 'black') : 'white'};
  font-weight: 500;
`;

function Input({ label, onPress, outlined, danger }) {
  return (
    <StyledButton onPress={onPress} outlined={outlined} >
      <Text outlined={outlined} danger={danger} >{label}</Text>
    </StyledButton>
  )
}

export default Input
