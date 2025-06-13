// *************************************
//  함수 작성 과제
// *************************************

// 1. 인사말 메시지
function greetUser(username) {
  return `안녕하세요! ${username}님. 좋은 하루 되세요!`;
}

// 2. 원가 계산
const calculateOriginalPrice = function (priceWithTax) {
  return priceWithTax / 1.033;
}

// 3. 주류 판매 가능 여부
let name = '문서영', age = 25, gender = 'female';
let registrationCard = {name, age, gender};

const canSellAlcohol = (registrationCard) => {
  return registrationCard.age >= 19;
}

// 4. 할인가 계산
function getDiscountedPrice(originalPrice, discountPercent) {
  return originalPrice * (100 - discountPercent) * 0.01;
}

// 5. 등급 판단
function gradeReport (score) {
  let grade, description;
  const range = Math.floor(score / 10);

  switch (range) {
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
