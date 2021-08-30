import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import ArtifactsCard from '../Cards/ArtifactsCard';
import Loading from '../Loading/Loading';

const DepartmentWiseProducts = ({ location }) => {
  const { pathname } = useLocation();
  const dept = location.search.substring(6);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const fetchData = () => {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/products/department?dept=${dept}`)
        .then((res) => {
          setData(res.data.products);
          setLoading(false);
        });
    };
    fetchData();
  }, [dept, pathname]);
  return loading ? (
    <Loading />
  ) : (
    <div>
      {Object.keys(data).map((item, i) => (
        <div key={i}>
          <ArtifactsCard data={data[item]} />
        </div>
      ))}
      ;
    </div>
  );
};

export default DepartmentWiseProducts;
