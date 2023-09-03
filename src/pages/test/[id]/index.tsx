import { useMatch } from 'react-router-dom';

export default () => {
  const match = useMatch('/test/:id');
  console.warn(match);
  return (
    <div>
      I am dynamic-routes test.
    </div>
  );
};
