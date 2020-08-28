import React, {useState, Component} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SliderComponent,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Picker} from '@react-native-community/picker';
//스크린 임포트

const axios = require('axios');
//picker 생성클래스
class MkPicker extends Component {
  state = {
    default_type: '',
    sido: [],
    target: [],
    major: [],
    name: '',
  };
  nameFor = {
    sido: '시도명',
    target: '대상',
    major: '분야',
  };
  constructor(props) {
    super(props);
  }

  onFormSubmit = (value, name) => {
    this.props.onSubmit({value: value, name: name});
  };

  // 변경되는 것을 자동으로 리플래시 되면서 반영함.
  componentDidMount() {
    //시도 필터정보
    axios.get(this.props.url).then((response) => {
      //state.data에 response로 받은 json 값을 넣어줌
      var objForSettingFilter = {};
      objForSettingFilter[this.props.filterName] = response.data;

      this.setState(objForSettingFilter);

      this.setState({name: this.nameFor[this.props.filterName]});
    });

    // this.setState({...this.state, default_type: this.props.default});
  }
  render() {
    //major_code를 code로 통일하면 함수를 통일할 수 있음
    let pickerItems = this.state[this.props.filterName].map((item, i) => {
      return <Picker.Item key={i} label={item.name} value={item.id} />;
    });

    return (
      <View>
        <Picker
          selectedValue={this.state.default_type || this.props.default}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({default_type: itemValue});
            this.onFormSubmit(itemValue, this.props.filterName);
          }}>
          <Picker.Item label={this.state.name} value="" />
          {pickerItems}
        </Picker>
      </View>
    );
  }
}

module.exports = MkPicker;
