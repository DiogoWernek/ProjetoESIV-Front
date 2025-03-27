import * as S from './styles'

interface sidebarStatus {
  closed: string
}

const UserProfile = ({ closed }: sidebarStatus) => {
  console.log(closed)
  return(
  <div style={{ position: 'relative'}}>
    <S.Container closed={closed === 'closed'}>
      <div className='user-photo'>
        <p>D</p>  
      </div>
      <S.UserName closed={closed === 'closed'}>
        <p>Deividi Costinha</p>
      </S.UserName>
    </S.Container>

    {closed === 'closed' ? (
      <p 
        style={{ padding: '0.3rem 0.5rem', borderRadius: "999px", position: 'absolute', backgroundColor: 'white' , top: '10px', 
          right: '31%', color: '#2662D9' }}
      >
        D
      </p>
      ) : (<></>)}
  </div>
  )
}

export default UserProfile;