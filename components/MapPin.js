import React from 'react'
import styled from 'react-emotion'
import {keyframes} from 'emotion'

/*
  Pin Colors are defined here.
*/

const pinColor = '#00cae9'
const pinHoverColor = '#3498db'

const startPinColor = '#2ecc71'
const startPinHoverColor = '#27ae60'

const endPinColor = '#e74c3c'
const endPinHoverColor = '#c0392b'

const getPinColor = type => ({
  start: startPinColor,
  end: endPinColor
})[type] || pinColor

const getPinHoverColor = type => ({
  start: startPinHoverColor,
  end: endPinHoverColor
})[type] || pinHoverColor

/*
  Custom Map Pin Components
*/

const pulsate = keyframes`
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0;
  }

  50% {
    opacity: 1;
    filter: none;
  }

  100% {
    transform: scale(1.2, 1.2);
    opacity: 0;
  }
`

const bounce = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-2000px) rotate(-45deg);
  }

  60% {
    opacity: 1;
    filter: none;
    transform: translateY(30px) rotate(-45deg);
  }

  80% {
    transform: translateY(-10px) rotate(-45deg);
  }

  100% {
    transform: translateY(0) rotate(-45deg);
  }
`

const PinItem = styled.div`
  height: 30px;
  transform: rotate(-45deg);
  border-radius: 50% 50% 50% 0;
  background: ${props => getPinColor(props.type)};
  animation: ${bounce} 1s ease;
  cursor: pointer;
  left: 50%;
  margin: -20px 0 0 -20px;
  position: absolute;
  top: 50%;
  width: 30px;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &::after {
    background: white;
    border-radius: 50%;
    content: '';
    height: 14px;
    margin: 8px 0 0 8px;
    position: absolute;
    width: 14px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  }

  &:hover {
    background: ${props => getPinHoverColor(props.type)};
    transform: rotate(-45deg) scale(1.3);
  }
`

const PinEffect = styled.div`
  background: rgba(0,0,0,0.2);
  border-radius: 50%;
  height: 14px;
  left: 50%;
  margin: 11px 0px 0px -12px;
  position: absolute;
  top: 50%;
  transform: rotateX(55deg);
  width: 14px;
  z-index: -2;

  &::after {
    animation-delay: 1.1s;
    animation: ${pulsate} 1s ease-out infinite;
    border-radius: 50%;
    box-shadow: 0 0 1px 2px ${props => getPinColor(props.type)};
    content: '';
    height: 40px;
    margin: -13px 0 0 -13px;
    opacity: 0;
    position: absolute;
    width: 40px;
  }

  &:hover::after {
    background: ${props => getPinHoverColor(props.type)};
  }
`

const Pin = ({name, onClick, type}) => (
  <div onClick={onClick}>
    <PinItem type={type} />
    <PinEffect type={type} />
  </div>
)

export default Pin
