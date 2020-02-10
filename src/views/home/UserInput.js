import React, { Component } from 'react';
import { Button, Form, Header, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { createTicket } from '../../utils/api';

const inputStyle = {
  display: 'block',
  flex: '10',
  padding: '5px',
  margin: '10px',
};

export default class UserInput extends Component {
  state = {
    ticket: {
      url: '',
      screenshots: [
        {
          height: 0,
          width: 0,
          filename: 'screenshot.png',
          userAgent: '',
        },
      ],
    },
    newTicket: null,
    showOptions: false,
  };

  showOptions = e => {
    if (this.state.showOptions) {
      this.setState({ showOptions: false });
    } else {
      this.setState({ showOptions: true });
    }
  };
  //for multiple on forms on a field
  onChange = e => {
    if (e.target.name === 'width' || e.target.name === 'height') {
      var screenshotProp = this.state.ticket.screenshots[0];
      if (e.target.name === 'width') {
        screenshotProp.width = parseInt(e.target.value);
      } else {
        screenshotProp.height = parseInt(e.target.value);
      }
      this.setState({ screenshotProp });
    } else {
      var ticket = { ...this.state.ticket };
      ticket.url = e.target.value;
      this.setState({ ticket });
    }
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const body = JSON.stringify(this.state.ticket);
    const res = await createTicket(body);
    if (!res) {
      console.error('Error creating ticket!!');
      // TODO: let user know about error
    } else {
      console.log(res);
      this.setState({ newTicket: res.ticket });
    }
  };

  render() {
    const { newTicket } = this.state;
    return (
      <div>
        {newTicket ? (
          <Redirect to={`/tickets/${newTicket.ID}`} />
        ) : (
          <>
            <Header as="h3"> Enter Parameters:</Header>
            <Form
              onSubmit={this.onFormSubmit}
              style={{ display: 'inline-block' }}
            >
              <Form.Group inline>
                <label style={{ padding: '10px' }}>Url:</label>
                <Form.Input
                  style={inputStyle}
                  type="url"
                  name="url"
                  required
                  placeholder="http://mysite.com"
                  value={this.state.ticket.url}
                  onChange={this.onChange}
                />
                <Button content="Submit" />
                <Button
                  type="button"
                  onClick={this.showOptions}
                  color="teal"
                  icon
                >
                  <Icon name="cog" />
                  Options
                </Button>
              </Form.Group>

              {this.state.showOptions && (
                <Form.Group inline>
                  <label>Width:</label>
                  <Form.Input
                    style={inputStyle}
                    type="text"
                    name="width"
                    placeholder="Enter an image width"
                    onChange={this.onChange}
                  />
                </Form.Group>
              )}
              {this.state.showOptions && (
                <Form.Group inline>
                  <label>Height:</label>
                  <Form.Input
                    style={inputStyle}
                    type="text"
                    name="height"
                    placeholder=" Enter an image height"
                    onChange={this.onChange}
                  />
                </Form.Group>
              )}
            </Form>
          </>
        )}
      </div>
    );
  }
}
