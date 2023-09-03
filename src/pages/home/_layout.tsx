import type { PropsWithChildren } from 'react';

export default (props: PropsWithChildren<{}>) => {
  const { children } = props;
  return (
    <div>
      I am Home Layout
      {children}
    </div>
  );
};

