/**
 * App container.
 * @module components/theme/App/App
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import config from 'config';
import { Breadcrumbs, Footer, Header, Navigation, Toolbar } from '../../../components';

/**
 * This class defines the app container.
 * @function App
 * @param {Object} props Component properties.
 * @param {Object} props.children Child nodes.
 * @param {Object} props.location Location object.
 * @returns {string} Markup for the component.
 */
const App = ({ children, location }) => {
  const path = location.pathname
                .replace('/add', '')
                .replace('/delete', '')
                .replace('/edit', '')
                .replace('/login', '')
                .replace('/logout', '');
  const action = location.pathname.indexOf('/edit') === -1 ?
    (location.pathname.indexOf('/add') === -1 ?
      (location.pathname.indexOf('/delete') === -1 ? 'view' : 'delete') : 'add') : 'edit';

  return (
    <div className="plone-toolbar-expanded">
      <Helmet { ...config.app.head } />
      <Toolbar path={path} selected={action} />
      <div className="outer-wrapper">
        <Header />
        <Navigation path={path} />
        <div id="above-content-wrapper">
          <section id="viewlet-above-content">
            <Breadcrumbs />
          </section>
        </div>
        <div className="container">
          <div className="row">
            <aside id="global_statusmessage"></aside>
          </div>
          <main id="main-container" className="row row-offcanvas row-offcanvas-right">
            <div id="column1-container">
            </div>
            <div id="content-container">
              {children}
            </div>
            <div id="column2-container">
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default connect(
  () => ({}),
  { pushState: routeActions.push }
)(App);
