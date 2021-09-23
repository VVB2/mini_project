import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  inputs: {
    marginBottom: '15px',
    color: 'red',
  },
  leftGrid: {
    backgroundColor: '#2874f0',
    padding: '40px 33px',
    width: '240px',
    backgroundImage:
      "url('https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png')",
    backgroundPositionX: 'center',
    backgroundPositionY: '85%',
    backgroundRepeat: 'no-repeat',
  },
  rightGrid: {
    backgroundColor: '#fff',
    padding: '56px 35px 16px 35px',
    width: '434px',
  },
  button: {
    '&:hover': {
      backgroundColor: '#f24f00',
    },
    backgroundColor: '#fb641b',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 20%)',
    color: '#fff',
    height: '48px',
    fontSize: '15px',
    margin: '5px 0 30px 0',
  },
  input: {
    '&&&:before': {
      borderBottom: '0.5px solid rgba(0,0,0,0.6)',
    },
    color: 'rgba(0,0,0,0.6)',
  },
  staticText: {
    color: 'rgba(0,0,0,0.6)',
  },
}));

export default useStyles;
