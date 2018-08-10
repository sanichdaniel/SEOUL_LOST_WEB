// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { Container, Input, Button, Form, FormGroup, Label, InputGroup, InputGroupAddon, ButtonGroup } from 'reactstrap';
import { Creators as Actions } from './reducer';
import { getToken } from '../../../utils/localStorage';


type Props = {
  newLost: (State) => void,
};

type State = {
  title: string,
  itemType: string,
  acquiredDate: string,
  lostPlace: string,
  color: string,
  content: string,
};


class NewLostPage extends React.Component <Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      contentType: 'lost',
      title: '',
      itemType: '',
      acquiredDate: '',
      lostPlace: '',
      color: '',
      content: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);

    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  handleSubmit(event) {
    event.preventDefault();
    let error = null;
    const { title, itemType, acquiredDate, lostPlace, color, content } = this.state;
    !title && (error = '글 제목을 입력하세요');
    if (error) {
      alert(error);
      return;
    }
    const formData = new FormData();
    const data = _.omit(this.state, ['bookSelected', 'imagePreviewUrl', 'contentType']);

    for (const key in data) {
      formData.append(key, data[key]);
    }
    this.props.newLost(this.state.contentType, formData);
  }
  handleDayClick(day) {
    this.setState({ acquiredDate: day });
  }
  render() {
    const { acquiredDate } = this.state;
    return (
      <Container>
        {
          !getToken() && <Redirect to={'/'} />
        }
        <br />
        <h1>분실 신고</h1>
        <hr />
        <Form>
          <FormGroup>
            <Label>분실 신고</Label>
            <Input onChange={({ target }) => this.setState({ title: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">분류</Label>
            <Input
              type="select" name="select" id="exampleSelect"
              onChange={({ target }) => this.setState({ itemType: target.value })}
            >
              <option>선택</option>
              <option>휴대폰</option>
              <option>가방</option>
              <option>악기</option>
              <option>의류</option>
              <option>전자기기</option>
              <option>지갑</option>
              <option>카드</option>
              <option>기타</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>분실 날짜</Label>
            <br />
            <DayPickerInput
              value={acquiredDate}
              onDayChange={this.handleDayClick}
            />
          </FormGroup>
          <FormGroup>
            <Label>분실 장소</Label>
            <Input onChange={({ target }) => this.setState({ lostPlace: target.value })} />
            {console.log(this.state)}
          </FormGroup>
          <FormGroup>
            <Label>색깔</Label>
            <Input type="select" onChange={({ target }) => this.setState({ color: target.value })}>
              <option>선택</option>
              <option>빨강색</option>
              <option>주황색</option>
              <option>분홍색</option>
              <option>노랑색</option>
              <option>초록색</option>
              <option>파랑색</option>
              <option>보라색</option>
              <option>회색</option>
              <option>검정색</option>
              <option>흰색</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>특이 사항</Label>
            <Input onChange={({ target }) => this.setState({ content: target.value })} />
          </FormGroup>
          <Button onClick={this.handleSubmit}>등록하기</Button>
        </Form>
      </Container>
    );
  }
}
  /*
  render() {
    return (
      <Container>
        {
          !getToken() && <Redirect to="/" />
        }
        <br />
        <h1>글 작성</h1>
        <hr />
        <Form>
          <FormGroup>
            <Label>글 제목</Label>
            <Input onChange={({ target }) => this.setState({ title: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>글 종류</Label>
            <div>
              <ButtonGroup>
                <Button
                  onClick={() => this.setState({ contentType: 'sales' })}
                  color={this.state.contentType === 'sales' ? 'primary' : 'secondary'}
                >팝니다</Button>
                <Button
                  onClick={() => this.setState({ contentType: 'purchases' })}
                  color={this.state.contentType === 'purchases' ? 'primary' : 'secondary'}
                >삽니다</Button>
              </ButtonGroup>
            </div>
          </FormGroup>
        </Form>
        <hr />
        <h4>책 정보 <InterparkSearch handleBook={b => this.setState(b)} /></h4>
        <hr />
        <Form>
          {this.state.interparkImage && <img src={this.state.interparkImage} alt="book" width="20%" />}
          {this.state.imagePreviewUrl && <img src={this.state.imagePreviewUrl} alt="book" width="20%" />}
          <FormGroup>
            <Label>책 제목</Label>
            <Input disabled={this.state.bookSelected} value={this.state.bookTitle} onChange={({ target }) => this.setState({ bookTitle: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>저자</Label>
            <Input disabled={this.state.bookSelected} value={this.state.author} onChange={({ target }) => this.setState({ author: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>출판사</Label>
            <Input disabled={this.state.bookSelected} value={this.state.publisher} onChange={({ target }) => this.setState({ publisher: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>원가</Label>
            <InputGroup>
              <Input disabled={this.state.bookSelected} type="number" value={this.state.priceStandard} onChange={({ target }) => this.setState({ priceStandard: target.value })} />
              <InputGroupAddon>
                원
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>해당 단과대</Label>
            <Input onChange={({ target }) => this.setState({ department: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>중고 가격</Label>
            <InputGroup>
              <Input value={this.state.price} type="number" onChange={({ target }) => this.setState({ price: target.value })} />
              <InputGroupAddon>
                원
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>책 사진 추가</Label>
            <Input type="file" accept="image/*" onChange={this.handleImageChange} />
          </FormGroup>
        </Form>
        <hr />
        <h4>글 내용</h4>
        <hr />
        <Form>
          <FormGroup>
            <Label >내용</Label>
            <Input type="textarea" onChange={({ target }) => this.setState({ content: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>연락처</Label>
            <Input onChange={({ target }) => this.setState({ contact: target.value })} />
          </FormGroup>
          <Button onClick={this.handleSubmit}>등록하기</Button>
          <hr />
        </Form>
      </Container>
    );
  }
 }
  */
/*
const mapDispatchToProps = (dispatch) => bindActionCreators({
  newLost: Actions.newLostRequest,
}, dispatch);

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewLostPage);
*/
export default NewLostPage;
