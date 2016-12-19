/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Home.css';

const getQuery = gql`{news{title,link,contentSnippet}}`;

class Home extends React.Component {
  static propTypes = {
    news: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      contentSnippet: PropTypes.string,
    })).isRequired,
  };

  render() {

    const props = this.props;
    const { loading, news } = props.data;

    if (loading) {
      return <div>Loading</div>;
    } else {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <h1 className={s.title}>React.js News</h1>
            <ul className={s.news}>
              {news.map((item, index) => (
                <li key={index} className={s.newsItem}>
                  <a href={item.link} className={s.newsTitle}>{item.title}</a>
                <span
                  className={s.newsDesc}
                  dangerouslySetInnerHTML={{ __html: item.contentSnippet }}
                />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }
}

Home.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    news: PropTypes.array,
  }).isRequired,
};

const HomeWithStyles =  withStyles(s)(Home);
const HomeWithData = graphql(getQuery)(HomeWithStyles);
export default connect()(HomeWithData);
