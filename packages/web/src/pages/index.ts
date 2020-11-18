import {MainPage} from 'src/views/main'
import {withMiddlewares} from 'src/with-middlewares'

export default MainPage

export const getServerSideProps = withMiddlewares()
