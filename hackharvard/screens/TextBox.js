import { TextInput, StyleSheet } from 'react-native';

export default function TextBox({ prompt, setPrompt, customFont }) {
	return (
		<>
			<TextInput
				style={[styles.input, { fontFamily: customFont }]}
				multiline
				value={prompt}
				onChangeText={setPrompt}
				placeholder="How are you feeling today?"
			/>
		</>
	)


}

const styles = StyleSheet.create({
	input: {
		width: '80%',
		borderColor: 'gray',
		borderWidth: 1,
		padding: 10,
	}
});