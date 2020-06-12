import React, { Component } from 'react'
import { connect } from 'react-redux';
import apiClient from 'utils/apiClient'

class SearchResults extends Component {
  static async getInitialProps({ store, query }) {
    const what = query.what || '';
    const res = await apiClient.post(apiClient.Urls.getSearchResults, { What: what });
    const searchResults = res && res.results || [];
    return { searchResults };
  }

  render() {
    console.log('this.props.searchResults', this.props.searchResults);
    return (
      <div className="d-flex flex-wrap flex-direction-row justify-content-flex-start align-items-center">
        {
          this.props.searchResults.map((result, index) => {
            return (
              <div key={index} className="card m-5" style={{ width: 18 + 'rem' }}>
                <div className="card-body">
                  <h5 className="card-title">{result.name}</h5>
                  <p className="card-text">{result.phoneNo ? `Phone No: ${result.phoneNo}` : ''}</p>
                  <p className="card-text">{result.description}</p>
                  <a href="#" className="btn btn-primary">View Service</a>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {}
  },
  {
  }
)(SearchResults);