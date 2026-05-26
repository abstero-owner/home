/* =========================================================
   ABSTERO — script.js
   vanilla JS, no dependencies
   ========================================================= */
(function () {
	"use strict";

	const scroll = window.MotionScroll;
	const animate = window.MotionAnimate;

	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	const trackUmami = (eventName) => {
		if (typeof umami !== "undefined" && typeof umami.track === "function") {
			umami.track(eventName);
		}
	};

	// ---------- 1. NAV scroll state ----------
	const nav = document.getElementById("nav");
	const onScroll = () => {
		if (!nav) return;
		nav.classList.toggle("is-scrolled", window.scrollY > 8);
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	// ---------- 2. Mobile menu ----------
	const burger = document.querySelector(".nav__burger");
	const mobileMenu = document.getElementById("mobile-menu");
	if (burger && mobileMenu) {
		const toggle = (open) => {
			const next = open ?? !mobileMenu.classList.contains("is-open");
			mobileMenu.classList.toggle("is-open", next);
			burger.setAttribute("aria-expanded", String(next));
			mobileMenu.setAttribute("aria-hidden", String(!next));
			document.body.style.overflow = next ? "hidden" : "";
		};
		burger.addEventListener("click", () => toggle());
		mobileMenu
			.querySelectorAll("a")
			.forEach((a) => a.addEventListener("click", () => toggle(false)));
	}

	// ---------- 3. Reveal on scroll ----------
	const revealEls = document.querySelectorAll(
		"[data-reveal], [data-reveal-stagger]",
	);
	if ("IntersectionObserver" in window && !reduceMotion) {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("is-in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
		);
		revealEls.forEach((el) => io.observe(el));
	} else {
		revealEls.forEach((el) => el.classList.add("is-in"));
	}

	// ---------- 4. Magnetic buttons ----------
	if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
		document.querySelectorAll(".magnetic").forEach((btn) => {
			const strength = 0.25;
			btn.addEventListener("mousemove", (e) => {
				const r = btn.getBoundingClientRect();
				const x = (e.clientX - r.left - r.width / 2) * strength;
				const y = (e.clientY - r.top - r.height / 2) * strength;
				btn.style.transform = `translate(${x}px, ${y}px)`;
			});
			btn.addEventListener("mouseleave", () => {
				btn.style.transform = "";
			});
		});
	}

	// ---------- 5. Flow card cursor-tracked glow ----------
	if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
		document.querySelectorAll(".flow-card").forEach((card) => {
			card.addEventListener("mousemove", (e) => {
				const r = card.getBoundingClientRect();
				const mx = ((e.clientX - r.left) / r.width) * 100;
				const my = ((e.clientY - r.top) / r.height) * 100;
				card.style.setProperty("--mx", mx + "%");
				card.style.setProperty("--my", my + "%");
			});
		});
	}

	// ---------- 6. Parallax on hero mock ----------
	if (!reduceMotion) {
		const parallaxEls = document.querySelectorAll("[data-parallax]");
		let mx = 0,
			my = 0,
			tx = 0,
			ty = 0;
		document.addEventListener("mousemove", (e) => {
			const cx = window.innerWidth / 2;
			const cy = window.innerHeight / 2;
			mx = (e.clientX - cx) / cx;
			my = (e.clientY - cy) / cy;
		});
		const tick = () => {
			tx += (mx - tx) * 0.06;
			ty += (my - ty) * 0.06;
			parallaxEls.forEach((el) => {
				const f = parseFloat(el.dataset.parallax) || 0.04;
				el.style.transform = `translate3d(${tx * f * 40}px, ${ty * f * 40}px, 0)`;
			});
			requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	}

	// ---------- 7. Bg glows drift on scroll ----------
	if (!reduceMotion) {
		const g1 = document.querySelector(".bg-glow--1");
		const g2 = document.querySelector(".bg-glow--2");
		window.addEventListener(
			"scroll",
			() => {
				const y = window.scrollY;
				if (g1) g1.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
				if (g2) g2.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
			},
			{ passive: true },
		);
	}

	// ---------- 8. Range slider track fill ----------
	const updateRangeFill = (input) => {
		const min = parseFloat(input.min) || 0;
		const max = parseFloat(input.max) || 100;
		const val = parseFloat(input.value);
		const p = ((val - min) / (max - min)) * 100;
		input.style.setProperty("--p", p + "%");
	};
	document.querySelectorAll('input[type="range"]').forEach((r) => {
		updateRangeFill(r);
		r.addEventListener("input", () => updateRangeFill(r));
	});

	// ---------- 9. ROI Calculator ----------
	const hours = document.getElementById("hours");
	const rate = document.getElementById("rate");
	const cover = document.getElementById("cover");
	const hoursOut = document.getElementById("hoursOut");
	const rateOut = document.getElementById("rateOut");
	const coverOut = document.getElementById("coverOut");
	const monthlyOut = document.getElementById("monthly");
	const yearlyOut = document.getElementById("yearly");
	const paybackOut = document.getElementById("payback");

	const fmt = (n) => "$" + Math.round(n).toLocaleString("en-US");

	const calc = () => {
		if (!hours || !rate || !cover) return;
		const h = parseFloat(hours.value);
		const r = parseFloat(rate.value);
		const c = parseFloat(cover.value) / 100;
		const weekly = h * r * c;
		const monthly = weekly * 4.33;
		const yearly = monthly * 12;
		const payback = monthly > 0 ? 6000 / monthly : 0;

		hoursOut.textContent = h + " h";
		rateOut.textContent = "$" + r;
		coverOut.textContent = Math.round(c * 100) + "%";
		monthlyOut.textContent = fmt(monthly);
		yearlyOut.textContent = fmt(yearly);
		paybackOut.textContent =
			payback < 1 ? "< 1 mo" : "~" + payback.toFixed(1) + " mo";
	};
	[hours, rate, cover].forEach(
		(el) => el && el.addEventListener("input", calc),
	);
	calc();

	// ---------- 10. Contact intent (from ?intent= or #contact?intent=) ----------
	const INTENT_PARAM = "intent";
	const intentInput = document.getElementById("contact-intent");

	const parseHashLink = (href) => {
		const raw = href.startsWith("#") ? href.slice(1) : href;
		const [id, query] = raw.split("?");
		return {
			selector: id ? `#${id}` : null,
			intent: query
				? new URLSearchParams(query).get(INTENT_PARAM)
				: null,
		};
	};

	const readIntentFromUrl = () => {
		const fromSearch = new URLSearchParams(location.search).get(
			INTENT_PARAM,
		);
		if (fromSearch) return fromSearch;
		const hash = location.hash.slice(1);
		if (!hash) return null;
		const query = hash.includes("?") ? hash.split("?")[1] : "";
		return query
			? new URLSearchParams(query).get(INTENT_PARAM)
			: null;
	};

	const setContactIntent = (intent) => {
		if (!intentInput) return;
		intentInput.value = intent || "";
	};

	setContactIntent(readIntentFromUrl());
	window.addEventListener("hashchange", () => {
		setContactIntent(readIntentFromUrl());
	});

	// ---------- 11. Contact form ----------
	const form = document.querySelector(".contact__form");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const submit = form.querySelector(".contact__submit");
			const original = submit.innerHTML;

			// Собираем данные в объект
			const formData = new FormData(form);
			const data = Object.fromEntries(formData.entries());

			// Basic validation
			if (
				!data.name ||
				!data.email ||
				!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
			) {
				submit.innerHTML = "Please fill name & valid email";
				submit.style.background = "#ff6b6b";
				submit.style.color = "#fff";
				submit.style.borderColor = "#ff6b6b";
				setTimeout(() => {
					submit.innerHTML = original;
					submit.style.background = "";
					submit.style.color = "";
					submit.style.borderColor = "";
				}, 2400);
				return;
			}

			// Меняем статус на "Отправка"
			submit.innerHTML = "Sending…";
			submit.disabled = true;

			// РЕАЛЬНАЯ ОТПРАВКА ДАННЫХ В WEB3FORMS
			fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(data),
			})
				.then(async (response) => {
					if (response.status === 200) {
						// Успех
						trackUmami("contact_form_submit");
						submit.innerHTML = "✓ Request received — we'll reply within 4h";
						submit.style.background = "var(--accent)";
						submit.style.color = "var(--accent-ink)";
						submit.style.borderColor = "var(--accent)";
						form.reset();
					} else {
						// Ошибка сервера
						console.error("Server Error:", await response.text());
						submit.innerHTML = "Error. Please try again";
						submit.style.background = "#ff6b6b";
						submit.style.color = "#fff";
						submit.style.borderColor = "#ff6b6b";
					}
				})
				.catch((error) => {
					// Ошибка сети (например, отвалился интернет)
					console.error("Network Error:", error);
					submit.innerHTML = "Network error. Try again";
					submit.style.background = "#ff6b6b";
					submit.style.color = "#fff";
					submit.style.borderColor = "#ff6b6b";
				})
				.finally(() => {
					// В любом случае возвращаем кнопку в исходное состояние через 4 секунды
					setTimeout(() => {
						submit.innerHTML = original;
						submit.disabled = false;
						submit.style.background = "";
						submit.style.color = "";
						submit.style.borderColor = "";
					}, 4000);
				});
		});
	}

	// ---------- 12. Smooth anchor scroll w/ offset ----------
	document.querySelectorAll('a[href^="#"]').forEach((a) => {
		const href = a.getAttribute("href");
		if (!href || href === "#") return;
		a.addEventListener("click", (e) => {
			const { selector, intent } = parseHashLink(href);
			if (!selector) return;
			const target = document.querySelector(selector);
			if (!target) return;
			e.preventDefault();
			if (intent) {
				setContactIntent(intent);
				history.replaceState(
					null,
					"",
					`${selector}?${INTENT_PARAM}=${encodeURIComponent(intent)}`,
				);
			}
			const top = target.getBoundingClientRect().top + window.scrollY - 80;
			window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
		});
	});
	// ---------- 12. Sticky cards scroll animation (Framer Motion) ----------
	if (!reduceMotion) {
		const cards = document.querySelectorAll(".process__card");
		cards.forEach((card, index) => {
			const isLast = index === cards.length - 1;

			if (isLast) {
				scroll(
					animate(card, {
						scale: [1, 0.92],
						opacity: [1, 0.25],
						filter: ["blur(0px) brightness(1)", "blur(4px) brightness(0.6)"],
					}),
					{
						target: card,
						offset: ["start 30%", "end 0%"],
					},
				);
			} else {
				const targetEl = cards[index + 1];
				scroll(
					animate(card, {
						scale: [1, 0.92],
						opacity: [1, 0.25],
						filter: ["blur(0px) brightness(1)", "blur(4px) brightness(0.6)"],
					}),
					{
						target: targetEl,
						offset: ["start 85%", "start 20%"],
					},
				);
			}
		});
	}

	// ---------- 13. Pricing Toggle ----------
	const pricingSwitch = document.getElementById("pricing-switch");
	if (pricingSwitch) {
		const labelMonthly = document.getElementById("label-monthly");
		const labelYearly = document.getElementById("label-yearly");
		const priceTemplate = document.getElementById("price-template");
		const periodTemplate = document.getElementById("period-template");

		pricingSwitch.addEventListener("click", () => {
			const isYearly = pricingSwitch.getAttribute("aria-checked") === "true";

			// Toggle state
			const newState = !isYearly;
			pricingSwitch.setAttribute("aria-checked", String(newState));

			if (newState) {
				trackUmami("pricing_toggle_yearly");
			}

			// Update labels
			if (newState) {
				labelMonthly.classList.remove("is-active");
				labelYearly.classList.add("is-active");
			} else {
				labelYearly.classList.remove("is-active");
				labelMonthly.classList.add("is-active");
			}

			// Update text
			if (priceTemplate && periodTemplate) {
				priceTemplate.textContent = priceTemplate.getAttribute(
					newState ? "data-yearly" : "data-monthly",
				);
				periodTemplate.textContent = periodTemplate.getAttribute(
					newState ? "data-yearly" : "data-monthly",
				);
			}
		});
	}
})();
