const router = require('express').Router();
const bookController = require('../../controllers').book;

// Base route
router.get('/', (req, res) => {
	res.status(200).render('index');
});

const success = (books, res) => {
	if (!books) {
		return res.status(400).send({
			message: 'Book Not Found',
		});
	}
	res.status(200).render('viewBook', { books });
};
const failure = (error, res) => res.status(400).send(error);

// HTML Book Router
router.get('/book', (req, res) => {
	bookController
		.list()
		.then((books) => success(books, res))
		.catch((error) => failure(error, res));
});
router.get('/book/search', (req, res) => {
	bookController
		.getByTerm(req.query.term)
		.then((books) => success(books, res))
		.catch((error) => failure(error, res));
});
router.get('/book/:id', (req, res) => {
	bookController
		.getById(req.params.id)
		.then((books) => success(books, res))
		.catch((error) => failure(error, res));
});
router.post('/book', (req, res) => {
	bookController
		.add(req.body)
		.then((book) => success(book, res))
		.catch((error) => failure(error, res));
});
router.put('/book/:id', (req, res) => {
	bookController
		.update(req.params.id, req.body)
		.then((book) => success(book, res))
		.catch((error) => failure(error, res));
});
router.delete('/book/:id', (req, res) => {
	bookController
		.delete(req.params.id)
		.then((confirm) => res.status(200).end(confirm))
		.catch((error) => failure(error, res));
});

module.exports = router;
