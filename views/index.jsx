var React = require('react');

function index(props) {
    return (
        <html>
        <head><title>Document</title></head>
        <body>
            <form method={'post'} action={''} encType={'multipart/form-data'} >
                <input style={{display:'block'}} type={'text'} name={'name'}/>
                <input style={{display:'block'}} type={'file'} name='file'/>
                <input style={{display:'block'}} type={'submit'} value={'submit'} name={'submit'}/>
            </form>
        <p>{JSON.stringify(props.name)}</p>
        </body>
        </html>
    );
}

module.exports = index;