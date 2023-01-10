import { useNavigate, useParams } from 'react-router-dom';
import { Button, FormLabel, FormSelect, FormControl,Spinner, } from 'react-bootstrap';
import { editTableRequest, getTableById } from '../../redux/tablesRedux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const SingleTable = () => {
  const { id } = useParams();
  const tableId = useSelector((state) => getTableById(state, id));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [table, setTable] = useState(
    tableId || { status: '', peopleAmount: '', maxPeopleAmount: '', bill: '' }
  );
  
  const [status, setStatus] = useState(table.status || "");
  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount || "");
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount || "");
  const [bill, setBill] = useState(table.bill || "");

  useEffect(() => {
    if (tableId !== undefined) {
      setTable(tableId);
      setStatus(table.status);
      setPeopleAmount(table.currentPeople);
      setMaxPeopleAmount(table.maxPeople);
      setBill(table.bill);
    }
    if (tableId === undefined) {
      navigate('/');
    }
  }, [table, tableId, navigate]);

  const handleStatus = (value) => {
    if (value === 'Busy') {
      setBill('0');
    }
    setStatus(value);
    setMaxPeopleAmount(10);
  };

  const handleCurrentPeople = (value) => {
    if (value < 0 || isNaN(value)) {
      value = '0';
    }
    if (value > 10){
      value = '10';
    }
    setPeopleAmount(value);
  };

  const handleMaxPeople = (value) => {
    if (value < 0 || isNaN(value)) {
      value = '0';
    }
    if (value > 10) {
      value = '10';
    }
    setMaxPeopleAmount(value);
    if (Number(peopleAmount) > value) {
      setPeopleAmount(value);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const editedTable = {
      id,
      status,
      peopleAmount,
      maxPeopleAmount,
      bill,
    };
    dispatch(editTableRequest(editedTable));
    navigate('/');
  };

  if (tableId.length === 0) {
    return <Spinner animation="border" variant="primary" />
  }

  return (
    <form onSubmit={(e) => handleUpdate(e)}>
      <h1 className='my-3'>
        <strong>Table {table.id}</strong>
      </h1>

      <div className='mt-4 d-flex w-50 align-items-center'>
        <FormLabel className='mb-0 me-3'>
          <strong>Status:</strong>
        </FormLabel>
        <FormSelect
          value={status}
          onChange={(e) => handleStatus(e.target.value)}
        >
          <option value='Free'>Free</option>;
          <option value='Reserved'>Reserved</option>;
          <option value='Busy'>Busy</option>;
          <option value='Cleaning'>Cleaning</option>;
        </FormSelect>
      </div>

      <div className='mt-4 d-flex w-25 align-items-center'>
        <FormLabel className='mb-0 me-2'>
          <strong>People:</strong>
        </FormLabel>
        <FormControl
          value={peopleAmount}
          onChange={(e) => handleCurrentPeople(e.target.value)}
          type='text'
          className='w-25 text-center'
        />
        <p className='mx-2 mb-0'>/</p>
        <FormControl
          value={maxPeopleAmount}
          onChange={(e) => handleMaxPeople(e.target.value)}
          type='text'
          className='w-25 text-center'
        />
      </div>

      {status === 'Busy' ? (
        <div className='mt-4 d-flex w-25 align-items-center'>
          <FormLabel className='mb-0 me-4'>
            <strong>Bill:</strong>
          </FormLabel>
          <p className='me-1 mb-0'>$</p>
          <FormControl
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            type='text'
            className='w-25 text-center'
          />
        </div>
      ) : (
        ''
      )}

      <Button type='submit' className='mt-4'>
        Update
      </Button>
    </form>
  );
};

export default SingleTable;