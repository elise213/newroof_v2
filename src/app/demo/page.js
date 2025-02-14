"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return <div className="container"></div>;
};
