# Sculpting Time with Computers: Modelling Cinematic Continuity with Vision-Language Models

*by* [Daniel Chávez Heras](https://www.kcl.ac.uk/meet-dr-daniel-chavez-heras)*,* [Geoffroy
Noël](https://kdl.kcl.ac.uk/about/people/geoffroy-noel/)*,* [Ryan
Heuser,](https://www.english.cam.ac.uk/people/Ryan.Heuser) Arianna Ciula

*\[September 2026\]*

![](./media/c4edd9714311656d835d3c8228ec6999c218e1c8.png)

*\[FIGURE 1: Featured image -- Sequence of frames from The Godfather
(1972) showing the baptism scene with numbered arrows highlighting key
cinematic shots and transitions.\]*

*Caption: Part of automated analysis workflow on a scene from The
Godfather (1972).*

*Want to know more about this research? Why not read [Cinema and Machine
Vision: Artificial Intelligence, Aesthetics and
Spectatorship](https://edinburghuniversitypress.com/book-cinema-and-machine-vision.html)
which is now out on paperback! For a limited time, get a 30% discount
using the code **PAPER30***

## Introduction

How do films create the illusion of continuous action from separate
shots? This is a question that lies at the heart of cinema as a medium,
and one that film scholars and practitioners have grappled with for over
a century. In the [Sculpting Time with
Computers](https://kdl.kcl.ac.uk/projects/sculpting-time-with-computers/)
project, we've been exploring how computational approaches
---specifically large vision and language models (VLMs)--- can help us
understand and model the invisible "joints" that make moving images
appear to flow seamlessly in time.

This proof of concept was a collaboration between King's Digital Lab and
the [Department of Digital Humanities](https://www.kcl.ac.uk/ddh), and
is part of a broader research programme on computational modelling of
audiovisual media. Our aim is to gain new insights into how narrative
mechanisms like continuity editing relate to larger historical patterns
in cinema and post-cinema ---the emergence of new genres, changing
audience expectations, and evolving aesthetic forms enabled by
large-scale computational technologies.

## The Challenge: Making Visible the Connections Between Shots

When we watch a film, something remarkable happens, and it is remarkable
because it remains largely unnoticed. Intuitively, we might expect
viewers to feel disoriented when confronted with rapid cuts between
different fragments of a scene: bits and pieces at different space and
time scales, from the close-up of a hand to the vastness of a landscape
and back again in a few seconds. For early film theorists such as
Rudolph Arnheim, this type of fragmentation would naturally lead to a
kind of "seasickness" in audiences, and yet, he observes, something
rather unexpected happens: with seemingly little effort, viewers
synthesise these fragments into a coherent imagined timeline. Years
later, cognitive film theorists would describe this phenomenon more
precisely, as viewers becoming "willing subjects" of the film's
time-space manipulations.

Over time, a common set of techniques designed to achieve this effect of
continuity developed, and these are now well-known and taught in film
schools: the
[match-on-action](https://en.wikipedia.org/wiki/Cutting_on_action),
[180-degree rule](https://en.wikipedia.org/wiki/180-degree_rule),
[eyeline match](https://en.wikipedia.org/wiki/Eyeline_match), among
others. For the most part, professional editors learn to apply these
rules and conventions instinctively through careful observation and
practice. But although expert practitioners in crafting continuity can
usually tell very accurately whether a sequence is well or poorly
edited, most often they cannot explain *why* the effect is possible in
the first place. Perhaps the best example of a film editor going into
detail about how thy develop their craft by abstracting rules out of
embodied knowledge is Walter Murch, one of the most respected film
editors (and sound designers) in contemporary cinema.

<https://youtu.be/s49Al2CMfTI?si=qb2AwOA3I_SOIUKH>

![U,{be353be1-f8c7-481c-a279-b7d00e9e9f5b}{100},12.63425925925926,7.3125](./media/8b32988f25f7b90dbff0b13ef31956405cc636a8.png "Video titled: Walter Murch - The six criteria of film editing (293/320)")

As with other forms of embodied knowledge developed by practice and
convention over long periods of time, the emergence of cultural patterns
of meaning is a fascinating challenge for computational humanities. The
relations between shots are, for the most part, invisible---they exist
in the cognitive space between what's shown on screen and what audiences
infer. Film scholars have theorised these relations through careful
analysis of individual films, but such deductive approaches rely on few
points of extrapolation. What if we could surface these invisible
relations as data and at scale?

## A Theoretical Foundation: Burch's "Découpage"

Our computational approach takes as starting point the work of film
theorist [Noël Burch](https://en.wikipedia.org/wiki/No%C3%ABl_Burch),
who proposed a systematic way of classifying shot-to-shot transitions.
Drawing an analogy to music composition, Burch observed that filmmakers
work with a relatively limited palette of possibilities when assembling
sequences---much like how composers arrange individual notes to create
continuous melodies.

Burch identified fifteen fundamental types of shot transitions based on
space and time relationships, ranging from full continuity to radical
discontinuity. Michael Frierson, another film theorist, formalised this
framework as a 5×3 matrix:

![](./media/62fd31724c511d0453f6a555bfc95816bd3b1d29.png)

*\[FIGURE 2: Table showing Burch's 5×3 matrix of shot transitions --
Space (Continuous, Contiguous, Discontinuous) vs Time (Continuous,
Ellipsis definite/indefinite, Time reversal definite/indefinite).
Include the classification codes: CC, CE, CEi, CR, CRi, CtC, CtE, CtEi,
CtR, CtRi, DC, DE, DEi, DR, DRi\]*

From a data modelling perspective, this formalisation allows us to
encode any shot-to-shot transition as a position in this matrix. The
computational intuition is that, given enough samples, patterns drawn
from this encoding could help identify editing styles, directorial
signatures, genre conventions, or historical periods---a kind of
"stylometry" for film editing.

It's important to note, however, that as with other aesthetic
categories, Burch describes *latent* relations---what an idealised
viewer would infer between shots, rather than directly measurable
properties of the film itself. This has two key implications: 1) that to
model editing styles we need not only the films but a proxy for its
viewers; and 2) that this proxy is by necessity an abstraction. This is
something that Olga Goriunova calls "the abstract people of AI", in this
case using a Vision and Language model (VLM) as a **synthetic audience**
that draws on shared notions of memory, causality, and reasoning. There
are very good reasons to be critical about this process of subjective
abstraction and why we should be rightly sceptical of it. At the same
time, it bears saying that this is not just a feature of computational
approaches, classic close-reading film scholarship also mobilises
abstract subjectivities and idealised models of audiences, even if they
are not expressed in formal languages or computer programmes. For our
purposes here, we are interested in the possibilities enabled by
computational synthetic audiences, but do urge readers to look at Olga's
book to get a sense of the limitations too.

## Case Study: The Baptism Scene from The Godfather

To illustrate our approach, we focused on one of cinema's most analysed
sequences: the "baptism of fire" scene from Francis Ford Coppola's *The
Godfather* (1972). In this sequence, shots of Michael Corleone attending
his nephew's baptism are intercalated with shots of multiple murders
being carried out at his behest.

<https://youtu.be/bkoEALTHQwc?si=UQ_1AcZuZDCnWTDN>

![U,{6c05d4c9-6251-4dda-828d-e6ca5a551edd}{221},12.63425925925926,7.3125](./media/8b32988f25f7b90dbff0b13ef31956405cc636a8.png "Video titled: Baptism Scene | THE GODFATHER (1972) Movie CLIP HD")

Using the PySceneDetect library, we first segmented the entire film into
individual shots (1,429 in total). The baptism sequence (shots
1296--1364) demonstrates the now classic parallel editing technique: the
film maintains continuity in time (events happening simultaneously)
while showing radical discontinuity in space (the church vs. multiple
murder locations). The technique is widely used in popular narrative
cinema, and the sequence itself has transcended [its influence to the
point of
parody](https://youtu.be/-KDS_NuXYHI?si=bdd-BQhVWWHtvuMR&t=159).

![](./media/469eec8de987f8b9206f84b4f994975b79e9557e.png)

*\[FIGURE 3: Table showing shot analysis from The Godfather baptism
sequence -- including shot numbers, frame thumbnails, space/time
classifications, and Burch codes.\]*

By encoding these transitions as numerical values (from --2 for
discontinuity to +2 for continuity), we can visualise the editing
pattern as a signal---making visible the rhythmic structure that
underpins this iconic sequence.

![](./media/20ff2f7903717b92b9ad194ef06ec20680485154.png)

*\[FIGURE 4: Line graphs showing time and space continuity signals
across the baptism sequence -- visualising the oscillating pattern of
parallel editing\]*

## Two Computational Experiments

Creating these annotations manually is time-consuming and, crucially,
represents only one viewer's interpretation rather than an
inter-subjective consensus. Our proof of concept explored whether VLMs
could help generate this kind of data at scale. We designed two
complementary experiments:

### Experiment 1: Model-Guided "Lazy" Shot Clustering

In our first experiment, we used GPT-4 to group shots based on the
model's self-guided sense of similarity, without pre-defining
categories. We provided frame images and prompted the model to identify
"shot groups"---shots that are "the same in some respects intuitive to
the viewer."

The model successfully identified meaningful groupings based on shot
scale, subject, action, and location. For example, in a conversation
sequence from *The Godfather*, GPT-4 correctly grouped establishing
shots separately from close-ups of each character, reflecting the
["analytical editing" pattern described by Bordwell and
Thompson](https://www.davidbordwell.net/blog/2008/02/04/what-happens-between-shots-happens-between-your-ears/).
Arguably, the model seems to regroup shots independently from the prompt
and mainly by camera viewpoint and shot size as if attempting to
reconstruct the takes at production phase from the shots edited in
post-production, a sort of "uncutting" or "unediting" process,

![](./media/c4edd9714311656d835d3c8228ec6999c218e1c8.png)

![](./media/541d450e686d1134cedba2e15a5a4a3ddd35f729.png)

*\[FIGURES 5&6: Network visualisation showing lazy shot clustering
results -- nodes represent shots, positioned by model-defined groups,
with edges showing sequence order. Include examples from both The
Godfather and Vertigo (1958)\]*

This approach is highly flexible and produces intuitively coherent
results. However, the groupings are heavily influenced by the prompting
strategy, and the relations between shots aren't constrained to Burch's
theoretical framework. The experiment effectively tests the value of
operationalising visual data into measurable small units, but to make
the leap towards useful systematic film analysis, we first needed to
define objectives alongside constraints to design the prompt and
evaluate results in a more robust set of tests. Further iteration was
out of scope for this initial exploratory work; however, the lazy shot
clustering experiments proved very valuable as an example of quick
results without explanation, which very often makes working with VLMs
difficult from a scientific standpoint.

### Experiment 2: Critic-Guided Shot Sequence Classification

Our second experiment took a more constrained and shot sequence-aware
approach. Using the open-source Qwen2.5-VL-32B-Instruct-AWQ model (one
of the most capable open-weight video understanding models at the time),
we fed the whole shots sequence to the model and asked to classify
transitions according to Burch's established categories, with detailed
definitions provided in the prompt.

The results validated against expert's manual annotation[^1] revealed
both capabilities and limitations. Qwen performed reasonably well at
recognising changes in setting and identifying "narrative connections"
between shots. However, it made significant errors in temporal reasoning
---most notably conflating the baptism ceremony with a funeral, and
misidentifying relationships between the parallel murder scenes.

![](./media/ff60119f9fb06e6bbc9ad82e97311a8f5be2db36.jpg)

*\[FIGURE 7: Table comparing manual annotations with Qwen model output
for the same transitions -- showing where the model succeeded and
failed\]*

Several factors likely contributed to these errors. The model received
only frame images without audio (missing the organ music and crying that
cue temporal continuity) or broader narrative context (the apotheotic
resolution of the film's narrative arc for Michael). At close reading
level, we noticed that the baptism scene involves both parallel editing
(comparing baptism and execution) and cross-cutting (multiple
simultaneous executions), which is a particularly challenging
combination for a model with limited context. One of the most common
film-editing techniques proved to be challenging to one of the most
capable vision models.

*\[FIGURE 7: Experimental designs (conducted in green and black):
Computational Burch (1 and 2) are the experiments discussed in this
blogpost.\]*

## Key Insights and Lessons Learned

### The Persistent Relevance of Context

A crucial insight from these experiments concerns the amount of
contextual information available to different "viewers"---human or
computational. When a human expert classifies shot transitions, they
draw on their memory of the entire film, knowledge of narrative
conventions, and rich audiovisual information. Our models, by contrast,
received only a handful of frames presented in isolation.

This raises important methodological questions: What is the minimum
amount of input information needed to accurately identify relationships
between shots? What is the right balance between reduction of features
and meaningful results aligned to our research questions ([Ciula et al.
2023](https://doi.org/10.11647/OBP.0369))? How could VLMs be redesigned,
harnessed, or post-trained in order to detect parallel editing? What
kind of data would they need access to? And is this data only available
through human annotation?

The answers might depend on how we imagine our ideal subjects and how
they aggregate and interact to form a synthetic audience, whether we
imagine a classifier that has "already watched" the whole film, one
seeing frames with a sliding window of context, or something in
between---a viewer experiencing the film in real-time, knowing only what
came before, but who has seen other films in the past and may have a
chat with other future viewers in the future. How can we model this as a
dynamic system? Perhaps a multi-model system (e.g. ensemble voting or
agentic deliberation) is the minimum required to claim any sort of
approximation of consensus between independent viewers.

### The Value of Theoretical Grounding

The experiments also highlighted ambiguities in Burch's foundational
taxonomy that had not been fully articulated. What exactly distinguishes
"contiguous" from "continuous" space? Why does the temporal dimension
lack this nuance? The process of translating theory into computable
instructions forced us to confront these gaps, not apparent at the
encoding matrix level. In other words, theory is very valuable to
bootstrap epistemic assumptions while computational modelling can play a
key role in the critique and refinement of these assumptions. These are
two complementary knowledge operations that inform each other.

This is, we would argue, one of the core epistemic values of
computational approaches in the humanities: not always or primarily to
validate results about what we already know, but to make us question the
explicability of our reasoning parameters. Building models ―whether
computational or conceptual--- and running simulations based on these
models, can tell us something new, not only about the phenomenon under
study but about our thinking of the phenomenon and its conceptual
definition.

### Human Annotation as Uncertain Ground Truth

Perhaps most provocatively, our experiments suggest that human
annotations might not be the definitive "ground truth" for this task.
Looking at the explanations Qwen provided for its classifications, we
observed a degree of ambiguity and indeterminacy in the theoretical
categories themselves --- particularly when temporal relationships
cannot be easily inferred from visual form alone.

This doesn't invalidate Burch's theoretical framework, but it does
suggest that the emergence of continuity involves not only visual
perception but types of temporal inference and extrapolation that may be
fundamentally difficult to pin down ---for humans and machines alike. We
believe that human annotation alone will not solve this issue and for
this task at least might not be the most reliable data source, as we
can't fully explain temporal reasoning in humans either.

## Broader Implications for Digital Humanities

This proof of concept connects to larger questions about computational
approaches to cultural analysis and specifically to screen culture. Our
work draws on intermedia studies and theories of modelling that
emphasise how different "modalities"---the material, virtual, and
cognitive dimensions of media---interact to create meaning.

*\[LINK: For theoretical background, see Elleström's work on media
modalities: https://doi.org/10.1057/9780230275201_2\]*

What we're attempting to model is essentially the relationship between a
film's material properties (shots, frames, cuts) and its "virtual"
manifestation (how space and time are experienced by viewers) via
cognitive and perceptual processes. The construction of these models,
meaning the elements we choose to encode and what features we
prioritise, inevitably shapes how we interpret the results.

Importantly, this work is not about developing new computer vision
techniques per se, but about asking if and how VLMs can inform our
understanding of visual culture while they are simultaneously being used
to reshape such culture. The value lies in the explicit articulation of
an epistemic practice ---what we have called "**sculpting time with
computers**"

## Technical Approach

**Shot Boundary Detection:** We used PySceneDetect for automated
segmentation, which provides reliable results for hard cuts though some
transition types (dissolves, wipes) remain challenging. No automated SBD
system is perfect, and validation against manual annotation is still
important for critical applications. We found, for example, significant
variance between colour and black and white footage using the different
methods available in PySceneDetect.

**Model Selection:** For the second experiment, we deliberately chose an
open-weight model (Qwen2.5-VL) that could run locally. At the time, this
was one of the most capable models for video understanding that would
fit on the infrastructure available for the project.

**Experimental design and productive** **byproducts**: while in this
blogpost we reported only about two experiments, other experiments were
designed but not conducted (due to time and resources constraints) or
conducted as tests to explore complementary models and architectures
affordances but not included here for brevity (see the public code
repository at https://github.com/kingsdigitallab/sculpting-poc/).
Importantly, some of this work, complemented by KDL research time,
resulted in stand-alone reusable software applications for the
pre-processing and analysis of visual assets, namely BVQA and
[FrameSense](https://github.com/kingsdigitallab/framesense). ---which is
now actively being used for systematic pre-processing and model testing
in the [Intelligent Systems for Screen Archives
Project](https://www.kcl.ac.uk/research/issa) (ISSA).

## Future Directions

This proof of concept opens several avenues for further research:

**Richer Context:** Providing models with film synopses, character
descriptions, or audio features significantly improved classification in
preliminary tests. Systematic exploration of what contextual information
is most useful for a model to enhance temporal reasoning is a promising
avenue and overlaps to an extent with video understanding efforts in AI
research.

**Controlled Experiments:** Future work could select sequences with
single, clear types of discontinuity to systematically uncover model
capabilities, building toward a benchmark for this new task. The lack of
reliable benchmarks across disciplines makes progress in this area
fragmented and slow.

**Multimodal Analysis:** The current experiments used only visual
information. Incorporating audio would likely improve temporal
reasoning, since sound design often provides crucial continuity cues. At
the same time, incorporating sound data brings its own set of
computational modelling challenges. Again, there is an overlap here with
multimodal AI research.

**Scale:** With refined approaches, we aim to analyse larger corpora to
identify patterns across directors, genres, and historical periods
---moving from proof of concept toward the stylometric analysis of
editing that Burch's framework makes theoretically possible. Scale in
this instance is not only a matter of larger datasets and samples,
although that too is an issue, but of density and diversity, meaning not
just more data, but other types of [thick and blended
data](https://journals.sagepub.com/doi/full/10.1177/2053951718765026).

## Conclusion

Our experiments demonstrate that approximating inter-subjective
aesthetic consensus---the "synthetic audiences" and their shared
cognitive strategies--- is a viable and productive area for VLM-assisted
research, even as current models have significant limitations in
temporal reasoning.

Perhaps most importantly, we found that the value of this approach lies
not in VLMs as straightforward "data extractors," but as tools for
generating explanations and exposing ambiguities that stress-test
existing theoretical assumptions in humanities frameworks. The
progressive "thickening" of data through the aggregation of multiple
generated signals, offers a surface of interaction between human critics
and computational models that can introduce inductive potency to
deductive theoretical frameworks.

Rather than expecting computational models to produce consistent outputs
like traditional statistical tools, moving image researchers may find
greater success in designing contexts where the elasticity of VLM output
plays out as an advantage. From this point of view, we are not applying
computational methods *to* film but designing the abstract spaces for
synthetic audiences to be simulated; this is where most of the sculpting
happens!

*This research was conducted in collaboration between King's Digital Lab
and the Department of Digital Humanities, supported by the* *Digital
Futures Institute, the Faculty of Arts & Humanities and the AI Institute
at King's College London. This research was conducted* with
infrastructure for research data storage provided by *King's College
London e-Research. This proof-of-concept collaboration also connects to
the* [Intelligent Systems for Screen Archives
(ISSA)](https://kdl.kcl.ac.uk/projects/intelligent-systems-for-screen-archivesv-issa/)
*project.*

[^1]: We would like to thank Barbara Plotz
    (<https://www.kcl.ac.uk/people/barbara-plotz>) for her contribution
    as expert annotator for this task.
