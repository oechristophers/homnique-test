import React from 'react'

export default function usefulComponents() {
  return (
    <div className="grid grid-cols-2">
    <div className="flex flex-col w-full items-center justify-center h-[100vh] gap-11  ">
      <div className="w-full text-center">
        <Tooltip text="This is a tooltip pointing up" placement="top">
          <button>Hover over me (Top)</button>
        </Tooltip>
      </div>
      <div className="w-full text-center">
        <Tooltip text="This is a tooltip pointing down" placement="bottom">
          <button>Hover over me (Bottom)</button>
        </Tooltip>
      </div>
      <div className="w-full text-center">
        <Tooltip text="This is a tooltip pointing left" placement="left">
          <button>Hover over me (Left)</button>
        </Tooltip>
      </div>
      <div className="w-full text-center">
        <Tooltip text="This is a tooltip pointing right" placement="right">
          <button>Hover over me (Right)</button>
        </Tooltip>
      </div>
    </div>

    <div className="flex flex-col w-full items-center justify-center h-[100vh] gap-11  ">
      <div className="w-full text-center">
        <Tooltip text=" up" placement="top">
          <button>Hover over me (Top)</button>
        </Tooltip>
      </div>
      <div className="w-full text-center">
        <Tooltip text=" down" placement="bottom">
          <button>Hover over me (Bottom)</button>
        </Tooltip>
      </div>
      <div className="w-full text-center">
        <Tooltip text=" left" placement="left">
          <button>Hover over me (Left)</button>
        </Tooltip>
      </div>
      <div className="w-full text-center">
        <Tooltip text=" right" placement="right">
          <button>Hover over me (Right)</button>
        </Tooltip>
      </div>
    </div>

    <div className="flex flex-col bg-slate-500 w-full items-center justify-center h-[100vh] gap-11  ">
      <div className="w-full text-center">
        <Tooltip
          text="Variable for remembering something for later up"
          hasButton
          btnText="learn more"
          placement="top"
        >
          <button>Hover over me (Top)</button>
        </Tooltip>
      </div>
      <div className="w-full text-center">
        <Tooltip
          text="Variable for remembering something for later down"
          hasButton
          btnText="learn more"
          placement="bottom"
        >
          <button>Hover over me (Bottom)</button>
        </Tooltip>
      </div>
      <div className="w-full text-center">
        <Tooltip
          text="Variable for remembering something for later left"
          hasButton
          btnText="learn more"
          placement="left"
        >
          <button>Hover over me (Left)</button>
        </Tooltip>
      </div>
      <div className="w-full text-center">
        <Tooltip
          text="Variable for remembering something for later right"
          hasButton
          btnText="learn more"
          placement="right"
        >
          <button>Hover over me (Right)</button>
        </Tooltip>
      </div>
    </div>
  </div>
  )
}
