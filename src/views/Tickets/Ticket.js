import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

const Ticket = () => {
  const { ticketID } = useParams();
  return (
    <>
      <Header as="h3">{ticketID}</Header>
    </>
  );
};

export default Ticket;
