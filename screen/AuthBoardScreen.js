

// 게시글더미데이터
const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      writer: '유저1',
      sido: 'jeju',
      content: '강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      writer: '유저1',
      content: '고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      writer: '유저2',
      content: '토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: 'Third Item',
      writer: '유저2',
      content: '토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      title: 'Third Item',
      writer: '유저2',
      content: '토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼',
    },
  
  ];
  
  
  // 게시글 하나
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.post - title}>{title}</Text>
    </View>
  );
export function AuthBoardScreen() {
  // 탭에 따른 스크린 
  // 인증게시판 스크린
   return {
    //게시글 랜더메서드
    const renderItem = ({ item }) => (
      <Item title={item.title} />
    );
  
    // Make a request for a user with a given ID
    axios.get('http://myks790.iptime.org:8082/board/major')
      .then(function (response) {
        // handle success
        // console.log(response);
        // this.state = response.data;
        return response.data.map(function (item) { //people에서 contents,date,user를 뽑아내기 위해 map 사용
          // console.log(item)
          this.state=item;
        })
      })
      
      console.log('state =',a.state);
  
  
    //피커 상태데이터
    const [sidoselectedValue, sidosetSelectedValue] = useState("sido");
    const [majorselectedValue, majorsetSelectedValue] = useState("major");
    const [targetselectedValue, targetsetSelectedValue] = useState("target");
  
    return (
      <SafeAreaView style={styles.container}>
        {/* 제목 */}
        <Text style={styles.title} >인증게시판 {state} </Text>
        {/* 분류 */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Picker
            selectedValue={sidoselectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => sidosetSelectedValue(itemValue)}
          >
            <Picker.Item label="시도명" value="sido" />
            <Picker.Item label="서울특별시" value="seoul" />
          </Picker>
          <Picker
            selectedValue={majorselectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => majorsetSelectedValue(itemValue)}
          >
            <Picker.Item label="분류" value="major" />
            <Picker.Item label="IT" value="it" />
          </Picker>
          <Picker
            selectedValue={targetselectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => targetsetSelectedValue(itemValue)}
          >
            <Picker.Item label="대상" value="target" />
            <Picker.Item label="유아" value="children" />
          </Picker>
        </View>
        {/* 게시판 */}
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }}







// // 게시글더미데이터
// const DATA = [
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'First Item',
//       writer: '유저1',
//       sido: 'jeju',
//       content: '강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지',
//     },
//     {
//       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//       title: 'Second Item',
//       writer: '유저1',
//       content: '고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d72',
//       title: 'Third Item',
//       writer: '유저2',
//       content: '토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d73',
//       title: 'Third Item',
//       writer: '유저2',
//       content: '토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d74',
//       title: 'Third Item',
//       writer: '유저2',
//       content: '토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼',
//     },
  
//   ];
  
  
//   // 게시글 하나
//   const Item = ({ title }) => (
//     <View style={styles.item}>
//       <Text style={styles.post - title}>{title}</Text>
//     </View>
//   );
  
//   // 탭에 따른 스크린 
//   // 인증게시판 스크린
//   function AuthBoardScreen(a) {
//     //게시글 랜더메서드
//     const renderItem = ({ item }) => (
//       <Item title={item.title} />
//     );
  
//     // Make a request for a user with a given ID
//     axios.get('http://myks790.iptime.org:8082/board/major')
//       .then(function (response) {
//         // handle success
//         // console.log(response);
//         // this.state = response.data;
//         return response.data.map(function (item) { //people에서 contents,date,user를 뽑아내기 위해 map 사용
//           // console.log(item)
//           this.state=item;
//         })
//       })
      
//       console.log('state =',a.state);
  
  
//     //피커 상태데이터
//     const [sidoselectedValue, sidosetSelectedValue] = useState("sido");
//     const [majorselectedValue, majorsetSelectedValue] = useState("major");
//     const [targetselectedValue, targetsetSelectedValue] = useState("target");
  
//     return (
//       <SafeAreaView style={styles.container}>
//         {/* 제목 */}
//         <Text style={styles.title} >인증게시판 {state} </Text>
//         {/* 분류 */}
//         <View style={{ flex: 1, flexDirection: 'row' }}>
//           <Picker
//             selectedValue={sidoselectedValue}
//             style={{ height: 50, width: 150 }}
//             onValueChange={(itemValue, itemIndex) => sidosetSelectedValue(itemValue)}
//           >
//             <Picker.Item label="시도명" value="sido" />
//             <Picker.Item label="서울특별시" value="seoul" />
//           </Picker>
//           <Picker
//             selectedValue={majorselectedValue}
//             style={{ height: 50, width: 150 }}
//             onValueChange={(itemValue, itemIndex) => majorsetSelectedValue(itemValue)}
//           >
//             <Picker.Item label="분류" value="major" />
//             <Picker.Item label="IT" value="it" />
//           </Picker>
//           <Picker
//             selectedValue={targetselectedValue}
//             style={{ height: 50, width: 150 }}
//             onValueChange={(itemValue, itemIndex) => targetsetSelectedValue(itemValue)}
//           >
//             <Picker.Item label="대상" value="target" />
//             <Picker.Item label="유아" value="children" />
//           </Picker>
//         </View>
//         {/* 게시판 */}
//         <FlatList
//           data={DATA}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//         />
//       </SafeAreaView>
//     );
//   }























// function AuthBoardScreen() {
//   //게시글 랜더메서드
//   const renderItem = ({ item }) => (
//     <Item title={item.title} />
//   );
  
//   //피커 상태데이터
//   const [sidoselectedValue, sidosetSelectedValue] = useState("sido");
//   const [majorselectedValue, majorsetSelectedValue] = useState("major");
//   const [targetselectedValue, targetsetSelectedValue] = useState("target");

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* 제목 */}
//       <Text style={styles.title} >인증게시판 </Text>
//       {/* 분류 */}
//       <View style={{flex: 1, flexDirection: 'row'}}>
//       <Picker
//         selectedValue={sidoselectedValue}
//         style={{ height: 50, width: 150 }}
//         onValueChange={(itemValue, itemIndex) => sidosetSelectedValue(itemValue)}
//       >
//         <Picker.Item label="시도명" value="sido" />
//         <Picker.Item label="서울특별시" value="seoul" />
//       </Picker>
//       <Picker
//         selectedValue={majorselectedValue}
//         style={{ height: 50, width: 150 }}
//         onValueChange={(itemValue, itemIndex) => majorsetSelectedValue(itemValue)}
//       >
//         <Picker.Item label="분류" value="major" />
//         <Picker.Item label="IT" value="it" />
//       </Picker>
//       <Picker
//         selectedValue={targetselectedValue}
//         style={{ height: 50, width: 150 }}
//         onValueChange={(itemValue, itemIndex) => targetsetSelectedValue(itemValue)}
//       >
//         <Picker.Item label="대상" value="target" />
//         <Picker.Item label="유아" value="children" />
//       </Picker>
//       </View>
//       {/* 게시판 */}
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//   );
// }
