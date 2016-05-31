import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DashboardPage } from './DashboardPage.container';
import HeroImage from './hero_image/HeroImage.component';

describe('<DashboardPage />', () => {
  it('should render with a <HeroImage />', () => {
    const wrapper = shallow(<DashboardPage />);
    expect(wrapper.contains(<HeroImage />));
  });
});
