/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Wrapper, Content } from './styled';

interface ProductNotificationProps {
  name: string;
  image_url: string;
  action: string;
}
const ProductNotification = ({ name, image_url, action }: ProductNotificationProps): JSX.Element => (
  <Wrapper action={action}>
    <Content>
      <img alt={name} src={image_url} />
      <span>
        <b>{action}</b> {name}
      </span>
    </Content>
  </Wrapper>
);

ProductNotification.propTypes = {
  name: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default ProductNotification;
