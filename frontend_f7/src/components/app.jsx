import React, { useState, useEffect } from 'react';
import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';



import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Framework7 Parameters
  const f7params = {
    name: 'App latihan',
    theme: 'auto',
    store: store,
    routes: routes,
  };

  const alertLoginData = async () => {
    try {
      const response = await fetch('http://localhost/backend_f7/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': username,
          'password': password
        }),
      });
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }
      const data = await response.json();
      console.log(data);
      if (!data.error) {
        localStorage.setItem("status", 'loggedin');
        f7.loginScreen.close();
      }
    } catch (error) {
      console.error(error);
    }
  };


  f7ready(() => {
    // console.log(localStorage.getItem('status'));
    // if (!localStorage.getItem('status')) {

    // }
  });


  return (
    <App {...f7params}>
      <Panel left cover dark>
        <View>
          <Page>
            <Navbar title="Left Panel" />
            <Block>Left panel content goes here</Block>
          </Page>
        </View>
      </Panel>

      <Panel right reveal dark>
        <View>
          <Page>
            <Navbar title="Right Panel" />
            <Block>Right panel content goes here</Block>
          </Page>
        </View>
      </Panel>

      <Views tabs className="safe-areas">
        <Toolbar tabbar icons bottom>
          <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconMd="material:home" text="Home" />
          <Link tabLink="#view-catalog" iconIos="f7:square_list_fill" iconMd="material:view_list" text="Catalog" />
          <Link tabLink="#view-settings" iconIos="f7:gear" iconMd="material:settings" text="Settings" />
        </Toolbar>

        <View id="view-home" main tab tabActive url="/" />
        <View id="view-catalog" name="catalog" tab url="/catalog/" />
        <View id="view-settings" name="settings" tab url="/settings/" />
      </Views>

      <Popup id="my-popup">
        <View>
          <Page>
            <Navbar title="Popup">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>Popup content goes here.</p>
            </Block>
          </Page>
        </View>
      </Popup>

      <LoginScreen id="my-login-screen">
        <View>
          <Page loginScreen>
            <LoginScreenTitle>Login</LoginScreenTitle>
            <List form>
              <ListInput
                type="text"
                name="username"
                placeholder="Your username"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
              />
              <ListInput
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </List>
            <List>
              <ListButton title="Sign In" onClick={() => alertLoginData()} />
              <BlockFooter>
                Some text about login information.<br />Click "Sign In" to close Login Screen
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>
    </App>
  );
};

export default MyApp;
