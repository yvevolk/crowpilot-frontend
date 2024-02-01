import { Text } from 'react-native'

export default function RankCalc ({length}) {

return (
<>
    {length >= 10 && (
        <Text>Captain</Text>
      )}
    {length <= 9 && length >= 7 && (
        <Text>First Officer</Text>
      )}
    {length <= 6 && length >= 4 && (
        <Text>Second Officer</Text>
      )}
    {length <=3 && length >= 1 && (
        <Text>Third Officer</Text>
    )}
    {length === 0 && (
        <Text>Rookie</Text>
    )}
</>
    )
}