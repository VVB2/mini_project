import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';

const DepartmentWise = () => {
  console.log(window.location.href);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  console.log(pathname);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
  return <div>Hello</div>;
};

export default DepartmentWise;
