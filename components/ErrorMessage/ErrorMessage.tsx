type Props = {
    message: string;
  };
  
  export default function ErrorMessage({ message }: Props) {
    return (
      <div style={{ color: 'red', padding: '12px 0', fontWeight: 500 }}>
        ⚠️ {message}
      </div>
    );
  }
  