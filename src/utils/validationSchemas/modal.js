import * as Yup from 'yup';

const schema = (userRewards) =>
  Yup.object().shape({
    awardedPerson: Yup.string().required('Required'),
    reward: Yup.number()
      .typeError('reward must be a number')
      .test(
        'is there enough money',
        `You only have ${userRewards} dollars`,
        (value) => value <= userRewards
      )
      .required('Required'),
    comment: Yup.string()
      .min(2, 'Too Short!')
      .max(250, 'Too Long!')
      .required('Required'),
  });

export default schema;
