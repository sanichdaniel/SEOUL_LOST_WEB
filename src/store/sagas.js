import { fork } from 'redux-saga/effects';
import LoginSaga from '../components/pages/LoginPage/saga';
import HomePageSaga from '../components/pages/HomePage/saga';
import NewPostSaga from '../components/pages/NewPostPage/saga';
import SaleDetailSaga from '../components/pages/DetailPage/saga';
import SignUpSaga from '../components/pages/SignUpPage/saga';
import ProfileSaga from '../components/pages/ProfilePage/saga';
import InterestSaga from '../components/pages/InterestPage/saga';
import EditSaga from '../components/pages/EditPage/saga';
import AlarmSaga from '../components/pages/AlarmPage/saga';
import GoogleMapSaga from '../components/pages/GoogleMapPage/saga';
import NewLostSaga from '../components/pages/NewLostPage/saga'

const req = require.context('.', true, /\.\/.+\/sagas\.js$/);

const sagas = [
  ...HomePageSaga,
  ...LoginSaga,
  ...NewPostSaga,
  ...SaleDetailSaga,
  ...SignUpSaga,
  ...ProfileSaga,
  ...InterestSaga,
  ...EditSaga,
  ...AlarmSaga,
  ...GoogleMapSaga,
  ...NewLostSaga,
];

req.keys().forEach((key) => {
  sagas.push(req(key).default);
});

export default function* () {
  yield sagas.map(fork);
}
