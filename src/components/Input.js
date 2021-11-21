import React from 'react'
import styled from 'styled-components/native';

const StyledInput = styled.TextInput`
  height: 40px;
  width: 200px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #aaa;
  padding: 0 15px;
  margin: 10px 0;
`;

function Input({ value, onChange, placeholder }) {
  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => onChange(text)}
    />
  )
}

export default Input
