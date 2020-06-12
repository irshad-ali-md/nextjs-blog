import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { connect } from 'react-redux'

import Homepage from '../components/Homepage'
import {
  setWhatText,
  setWhereText,
  getWhatAutocompleteData,
  getWhereAutocompleteData,
} from '../home'

class Home extends Component {
  // static async getInitialProps({ store, query }) {
  //   const lang = query.lang || 'javascript';
  //   await store.dispatch(getWhatAutocompleteData());
  //   return { lang }
  // }

  // componentDidMount() {
  //   this.props.getWhatAutocompleteData();
  // }

  // _goToAbout = () => {
  //   this.props.router.push('/about')
  // }

  whatOnInputChange = (event, value, reason) => {
    this.props.setWhatText(value);
    if (value.length >= 3) {
      this.props.getWhatAutocompleteData(value);
    }
  }

  whereOnInputChange = (event, value, reason) => {
    this.props.setWhereText(value);
    if (value.length >= 3) {
      this.props.getWhereAutocompleteData(value);
    }
  }

  render() {
    const { whatData, whereData, } = this.props
    return (
      <Fragment>
        <Homepage
          whatText={this.props.whatText}
          whereText={this.props.whereText}
          whatData={whatData || []}
          whereData={whereData || []}
          whatOnInputChange={this.whatOnInputChange}
          whereOnInputChange={this.whereOnInputChange}
        />
      </Fragment>
    )
  }
}

Home.propTypes = {
  // repos: PropTypes.instanceOf(Map).isRequired,
  // getTopRepos: PropTypes.func.isRequired
}

export { Home }
export default connect(
  (state) => {
    return {
      whatText: state.home.whatText,
      whereText: state.home.whereText,
      whatData: state.home.whatData,
      whereData: state.home.whereData,
    }
  },
  {
    setWhatText,
    setWhereText,
    getWhatAutocompleteData,
    getWhereAutocompleteData,
  }
)(Home)
