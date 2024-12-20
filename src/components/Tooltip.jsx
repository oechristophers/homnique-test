import React, { useState } from "react";
import styled from "styled-components";
import {
  ArrowDropDown,
  ArrowDropDownRounded,
  ArrowDropUpRounded,
  ArrowLeftSharp,
  ArrowRightRounded,
} from "@mui/icons-material";
import css from "styled-jsx/css";

// Tooltip container style
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

// Tooltip text with dynamic position
const TooltipText = styled.div`
  visibility: ${(props) =>
    props.isVisible ? "visible " : "hidden !important"};
  position: absolute;
  background-color: #0855ea !important;
  color: white !important;
  border-radius: 10px !important;
  font-size: 14px !important;
  white-space: nowrap !important;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1;
  padding: 0 12px !important;
  left: 50%;
  ${(props) =>
    props.placement === "top" &&
    css`
      bottom: -50px;
    `}
  ${(props) =>
    props.placement === "bottom" &&
    css`
      top: -50px;
    `}
  ${(props) =>
    props.placement === "right" &&
    css`
      top: 0;
      left: 34%;
    `}
  ${(props) =>
    props.placement === "left" &&
    css`
      top: 0;
      left: unset;
      right: 20%;
    `}
     
  transform: translateX(-50%);
`;

const Title = styled.h3`
  ${(props) =>
    props.hasButton &&
    css`
      max-width: 32ch;
      height: auto;
      word-wrap: break-word;
      white-space: break-spaces;
    `}
`;

const TooltipArrow = styled.div`
  position: absolute;

  ${(props) =>
    props.placement === "top" &&
    css`
      top: -2.5px;
      left: 50%;
    `}
  ${(props) =>
    props.placement === "bottom" &&
    css`
      bottom: -3px;
      left: 50%;
    `}
  ${(props) =>
    props.placement === "right" &&
    css`
      top: 35%;
      right: -14px;
    `}
  ${(props) =>
    props.placement === "left" &&
    css`
      top: 35%;
      left: 6px;
    `}

    ${(props) =>
    props.hasButton &&
    props.placement === "top" &&
    css`
      top: -7px;
    `};
  ${(props) =>
    props.hasButton &&
    props.placement === "bottom" &&
    css`
      bottom: -6px;
    `};
  ${(props) =>
    props.hasButton &&
    props.placement === "left" &&
    css`
      left: 23px;
    `};
  ${(props) =>
    props.hasButton &&
    props.placement === "right" &&
    css`
      right: -38px;
    `};

  transform: translateX(-50%);
  z-index: -1;
`;
const Tooltip = ({ text, children, placement = "top", hasButton, btnText }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const renderArrow = (isButton) => {
    if (placement === "top") {
      return (
        <div
          className={` rounded-[50%] bg-[#0855ea] ${
            isButton ? "w-[30px] h-[60px] " : "w-[12px] h-[20px] "
          }`}
        ></div>
      );
    }
    if (placement === "bottom") {
      return (
        <div
          className={` rounded-[50%] bg-[#0855ea] ${
            isButton ? "w-[30px] h-[60px] " : "w-[12px] h-[20px] "
          }`}
        ></div>
      );
    }
    if (placement === "left") {
      return (
        <div
          className={` rounded-[50%] bg-[#0855ea] ${
            isButton ? "h-[30px] w-[60px] " : "h-[12px] w-[20px] "
          }`}
        ></div>
      );
    }
    if (placement === "right") {
      return (
        <div
          className={` rounded-[50%] bg-[#0855ea] ${
            isButton ? "h-[30px] w-[60px] " : "h-[12px] w-[20px] "
          }`}
        ></div>
      );
    }
    return null;
  };

  return (
    <TooltipContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <TooltipText
        isVisible={isVisible}
        placement={placement}
        hasButton={hasButton}
      >
        <TooltipArrow hasButton={hasButton} placement={placement}>
          {renderArrow(hasButton)}
        </TooltipArrow>
        <Title
          hasButton={hasButton}
          className={`w-full text-center break-words ${
            text.split(" ").filter(Boolean).length > 1 ? "p-1" : "p-3"
          }`}
        >
          {text.trim()}
        </Title>{" "}
        {hasButton && (
          <button className=" text-sm font-medium text-white bg-[#ea9d08] w-full rounded-md px-4 my-3 py-2 ">
            {btnText}
          </button>
        )}
      </TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
