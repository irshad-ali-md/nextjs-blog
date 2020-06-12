import React, { Component } from 'react'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Link from 'next/link'

class Homepage extends Component {

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-row">
            <div className="col">
              <Autocomplete
                id="combo-box-demo"
                onInputChange={this.props.whatOnInputChange}
                options={this.props.whatData}
                getOptionLabel={(option) => option.word}
                renderInput={(params) => <TextField {...params} label="What (eg. plumber)" variant="outlined" />}
              />
            </div>
            <div className="col">
              <Autocomplete
                id="combo-box-demo"
                onInputChange={this.props.whereOnInputChange}
                options={this.props.whereData}
                getOptionLabel={(option) => option.locality1}
                renderInput={(params) => <TextField {...params} label="Where (eg. sandton)" variant="outlined" />}
              />
            </div>
            <Link href="/search/[what]" as={`search/${this.props.whatText}`}>
              <button className="btn btn-primary">Search</button>
            </Link>
            {/* <button onClick={this.props.getSearchResultsData} type="button" className="btn btn-primary">Find</button> */}
          </div>
        </form>
      </div>
    )
  }
}

Homepage.propTypes = {
  // repos: PropTypes.instanceOf(Map).isRequired
}

export default Homepage
