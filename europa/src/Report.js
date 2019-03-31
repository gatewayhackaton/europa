import React, { Component } from 'react';

export default class Report extends Component {
  constructor(props){
    super(props);
    document.body.classList.add('overflow-visible');
  }

  render(){
    return (

      <div className="container d-flex flex-column mt-3">
        <div className="card">
          <div className="card-body">
            <div class="form-group d-flex flex-column align-items-center">
              <h4 className="text-center">Let's make sure we got it all right</h4>
              <textarea className="form-control" rows="6" value={`EU citizen: yes
Hungarian national: no
Summary of the issue: I'm expected to have a Hungarian SSN to sign my work contract`}>
              </textarea>
              <img src={this.props.pic} className="py-3 mw-100"/>
              <h4 className="text-center">Anything else we should know?</h4>
              <textarea className="form-control"></textarea>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
