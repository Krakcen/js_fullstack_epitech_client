import React from 'react';
import { Grid, Flag, List } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { useStateValue } from '.';

const cookies = new Cookies();

const LanguageFooter = () => {
  const { i18n } = useTranslation();
  const [{ lang }, dispatch] = useStateValue();

  const handleLanguageChange = () => {
    if (lang === 'fr') {
      dispatch({
        type: 'SET_LANG',
        payload: 'us',
      });
      cookies.set('storyFactoryLang', 'en');
      i18n.changeLanguage('en');
    } else {
      dispatch({
        type: 'SET_LANG',
        payload: 'fr',
      });
      cookies.set('storyFactoryLang', 'fr');
      i18n.changeLanguage('fr');
    }
  };

  return (
    <Grid style={{ paddingBottom: '50px' }} divided inverted stackable>
      <Grid.Row centered columns={1}>
        <Grid.Column style={{ textAlign: 'center' }}>
          <List link inverted>
            <List.Item>
              <Flag onClick={handleLanguageChange} style={{ cursor: 'pointer' }} name={lang} />
            </List.Item>
          </List>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LanguageFooter;
