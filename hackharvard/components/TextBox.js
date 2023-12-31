import { TextInput, StyleSheet, Keyboard } from 'react-native';
import { useState } from 'react';

export default function TextBox({ prompt, setPrompt, customFont }) {

	// const [inputWidth, setInputWidth] = useState(150);
	// const [inputHeight, setInputHeight] = useState(150);


	const styles = StyleSheet.create({
		input: {
			top: -50,
			width: '85%',
			height: '80%',
			borderColor: 'transparent',
			// borderColor: 'white',
			backgroundColor: '#001C30',
			borderRadius: 10,
			borderWidth: 1,
			padding: 10,
			fontFamily: customFont,
			fontSize: 20,
			color: '#64CCC5',
			opacity: 0.8,
			// textAlign: 'center',
		}
	});

	return (
		<>
			<TextInput
				style={styles.input}
				multiline
				value={prompt}
				onChangeText={setPrompt}
				placeholder="How are you doing..."
				placeholderTextColor="rgba(255, 255, 255, 0.5)"
				onBlur={() => {
					Keyboard.dismiss()
				}}
			/>
		</>
	)


}

