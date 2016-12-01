
	<script type="x-shader/x-vertex" id="toonVertex">
		void main() {
			gl_Position = projectionMatrix *
            modelViewMatrix *
            vec4(position,1.0);
		}
	</script>

		<script type="x-shader/x-fragment" id="toonFragment">
			void main() {
	  		  gl_FragColor = vec4(	1.0,
	  		  						0.0,
	  		  						0.0,
	          						1.0); // A
			}
		</script>


