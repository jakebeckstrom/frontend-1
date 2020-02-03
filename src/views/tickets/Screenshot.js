import React, { Component } from 'react';
import { Image, Segment, Grid } from 'semantic-ui-react';
import { getArtifactURL } from '../../utils/api.js';

export default class Screenshot extends Component {
  render() {
    let image;
    //if there is a heigth/width apply it else the image is fluid
    if (this.props.height != null && this.props.width != null) {
      image = (
        <Image
          alt="fullpage screenshot"
          src={getArtifactURL(this.props.ticketID, 'screenshotFull.png')}
          heigth={this.props.height}
          width={this.props.width}
          centered
          bordered
        />
      );
    } else {
      image = (
        <Image
          alt="fullpage screenshot"
          src={getArtifactURL(this.props.ticketID, 'screenshotFull.png')}
          fluid
          bordered
        />
      );
    }
    return (
      <Grid columns={1} centered padded>
        <Segment compact>{image}</Segment>
      </Grid>
    );
  }
}
