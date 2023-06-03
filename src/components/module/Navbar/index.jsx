import React, { Fragment } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<Fragment>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						<span className="fw-semibold">Pro</span>
						<span className="text-light bg-dark">jects</span>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarText"
						aria-controls="navbarText"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Gallery
								</Link>
							</li>
						</ul>
						<span className="navbar-text">
							<button
								type="button"
								className="btn border col-12"
								data-bs-toggle="modal"
								data-bs-target="#exampleModal">
								Sign In
							</button>

							<div
								className="modal fade"
								id="exampleModal"
								tabIndex="-1"
								aria-labelledby="exampleModalLabel"
								aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h1 className="modal-title fs-5" id="exampleModalLabel">
												Modal title
											</h1>
											<CloseIcon
												type="button"
												className="btn-close"
												data-bs-dismiss="modal"
												aria-label="Close"
											/>
										</div>
										<div className="modal-body">
											<form>
												<div className="mb-3">
													<label
														htmlFor="exampleInputEmail1"
														className="form-label">
														Email address
													</label>
													<input
														type="email"
														className="form-control"
														id="exampleInputEmail1"
														aria-describedby="emailHelp"
													/>
													<div id="emailHelp" className="form-text">
														We'll never share your email with anyone else.
													</div>
												</div>
												<div className="mb-3">
													<label
														htmlFor="exampleInputPassword1"
														className="form-label">
														Password
													</label>
													<input
														type="password"
														className="form-control"
														id="exampleInputPassword1"
													/>
												</div>
												<div className="mb-3 form-check">
													<input
														type="checkbox"
														className="form-check-input"
														id="exampleCheck1"
													/>
													<label
														className="form-check-label"
														htmlFor="exampleCheck1">
														Check me out
													</label>
												</div>
											</form>
										</div>
										<div className="modal-footer">
											<button
												type="button"
												className="btn tw-bg-sky-500 btn-primary col-12">
												Login
											</button>
										</div>
									</div>
								</div>
							</div>
						</span>
					</div>
				</div>
			</nav>
		</Fragment>
	);
};

export default Navbar;
