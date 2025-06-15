# 1주차 과제 기록
JavaScript 1주차 과제 기록을 정리한 문서입니다.

## 📚 목차
- [문제풀이 및 과정](#-문제풀이-및-과정)
  1. [변수, 상수 작성](#1-변수-상수-작성)
  2. [함수 작성](#2-함수-작성)
- [1주차 회고](#-1주차-회고)

## 📝 문제풀이 및 과정

### 1. 변수, 상수 작성
변수와 상수에 올바른 이름을 지정하고 값을 할당하는 실습을 진행했다.
```
let userName = '문서영';
const ABSOLUTE_ZERO = -273.15;
const isLoggedIn = true;
let userAge = 25;
let productPrice = 39_900;
const BACKGROUND_COLOR = '#FFFFFF';
let commentCount = 12;
let currentPage = 3;
let membershipGrade = 'VIP';
let isButtonClicked = false;
```
다음과 같은 사항들을 고려해 선언하였다.
- 줄임말 사용을 지양하고 변수의 용도를 한 눈에 알 수 있게 명명
- 가급적이면 수식어-명사 형태로 일관된 네이밍 유지
- 변수는 camelCase 사용
- 절대영도와 같이 불변하는 상수, 전역에서 공통으로 쓰이는 상수는 대문자와 snake_case로 나타냄
  - ex. `ABSOLUTE_ZERO`, `PI`, `BACKGROUND_COLOR`


### 2. 함수 작성
1. 인사말 메시지 함수
```
function greetUser(username) {
  return `안녕하세요! ${username}님. 좋은 하루 되세요!`;
}
```
- 백틱 기호와 `${username}` 으로 매개변수를 포함한 문자열을 반환했다.

2. 원가 계산 함수
```
const calculateOriginalPrice = function (priceWithTax) {
  const TAX_RATE = 3.3;
  return priceWithTax / (1 + TAX_RATE / 100);
}
```
- 세율의 경우 변하지 않는 값으로 간주하여 상수로 선언하였다.

3. 주류 판매 가능 여부 함수
```
const canSellAlcohol = (registrationCard) => {
  return registrationCard.age 
    ? registrationCard.age >= 19
    : alert('나이를 찾을 수 없습니다.');
}
```
- 신분증인 `registrationCard` 객체는 함수 밖에서 선언 후 `canSellAlcohol` 함수의 매개변수로 전달했다.
- 반환값은 삼항 연산자를 사용하여 `registrationCard.age` 값이 truthy일 경우 19세 이상인지 판단하는 조건을, falsy할 경우 `'나이를 찾을 수 없습니다.'`라는 메세지를 띄우도록 했다.

4. 할인가 계산 함수
```
function getDiscountedPrice(originalPrice, discountPercent) {
  return originalPrice * (100 - discountPercent) * 0.01;
}
```

5. 등급 판단 함수
```
function gradeReport (score) {
  let grade, description;
  const RANGE = Math.floor(score / 10);

  switch (RANGE) {
    case 10:
    case 9:
      grade = 'A';
      description = '매우 우수';
      break;

    case 8: 
      grade = 'B';
      description = '우수';
      break;

    case 7: 
      grade = 'C';
      description = '보통';
      break;

    case 6: 
      grade = 'D';
      description = '미달, 통과 기준 근접';
      break;

    default:
      grade = 'F';
      description = '낙제'
  }

  return {score, grade, description};
}
```
- `RANGE` 라는 비교 기준 상수를 선언하였다. 이는 `score`를 10으로 나눈 후 `Math.floor()` 메서드로 소수를 버림한 결과이다.
- `RANGE` 값에 따른 case를 나누어 switch문으로 나타냈다. 

## 🌈 1주차 회고
이번 주는 자바스크립트 수업의 시작이자, 야무쌤과의 첫 만남으로 꽤나 의미가 깊은 시간이었다.
1주차엔 JS의 시작과 끝이라고 할 수 있는 객체와 모든 동작의 틀이 되는 함수를 배웠다.
혼자 공부할 때에 비해서 생각보다 팍팍 나가는 진도에 흠칫 놀라기도 잠시
차분하고 명료한 야무쌤의 강의에 매료되다 보니 시간이 금새 흘렀던 것 같다.

과제로는 변수명 짓기와 함수의 여러 가지 선언 방식을 다루었는데,
내용 자체는 간단한 듯 보이지만 함수부턴 효율적인 코드 짜기가 아주 중요해지므로 깔끔한 구문을 위해 여러 번 수정을 거쳐야 할 것 같다.
